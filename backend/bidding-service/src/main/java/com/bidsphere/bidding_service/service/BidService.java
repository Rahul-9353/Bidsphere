package com.bidsphere.bidding_service.service;

import com.bidsphere.bidding_service.config.RabbitMQConfig;
import com.bidsphere.bidding_service.dto.BidResponse;
import com.bidsphere.bidding_service.dto.PlaceBidRequest;
import com.bidsphere.bidding_service.entity.Bid;
import com.bidsphere.bidding_service.event.OutbidEvent;
import com.bidsphere.bidding_service.feign.AuctionClient;
import com.bidsphere.bidding_service.repository.BidRepository;
import com.bidsphere.bidding_service.websocket.BidWebSocketPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BidService {

    private final BidRepository bidRepository;
    private final AuctionClient auctionClient;
    private final BidWebSocketPublisher webSocketPublisher;
    private final RabbitTemplate rabbitTemplate;

    private static final BigDecimal FIXED_MIN_INCREMENT = new BigDecimal("1.00");
    private static final BigDecimal PERCENT_MIN_INCREMENT = new BigDecimal("0.05");

    public BidResponse placeBid(PlaceBidRequest request, String bidderUsername) {
        AuctionClient.AuctionDto auction = auctionClient.getAuctionById(request.getAuctionId());

        if (!"ACTIVE".equals(auction.status())) {
            throw new IllegalStateException("Auction is not active");
        }
        if (auction.sellerUsername().equals(bidderUsername)) {
            throw new IllegalStateException("Seller cannot bid on their own auction");
        }

        BigDecimal currentHighest = auction.currentHighestBid();

        BigDecimal fixedFloor = currentHighest.add(FIXED_MIN_INCREMENT);
        BigDecimal percentFloor = currentHighest.add(currentHighest.multiply(PERCENT_MIN_INCREMENT));
        BigDecimal minimumRequired = fixedFloor.max(percentFloor);

        if (request.getAmount().compareTo(minimumRequired) < 0) {
            throw new IllegalArgumentException(
                    "Bid too low. Minimum required bid is " + minimumRequired);
        }

//      find out who held the previous highest bid, Before we save the new one
        var previousTopBid = bidRepository.findTopByAuctionIdOrderByAmountDesc(request.getAuctionId());
        System.out.println("Looking for previous top bid on auctionId=" + request.getAuctionId() + " → found: " + previousTopBid.isPresent());

        Bid bid = new Bid();
        bid.setAuctionId(request.getAuctionId());
        bid.setBidderUsername(bidderUsername);
        bid.setAmount(request.getAmount());

        Bid saved = bidRepository.save(bid);

        auctionClient.updateHighestBid(request.getAuctionId(),
                new AuctionClient.UpdateHighestBidRequest(request.getAmount()));

//        publish an outbid event, but only if someone was actually outbid
        previousTopBid.ifPresent(prevBid -> {
            if (!prevBid.getBidderUsername().equals(bidderUsername)) {
                OutbidEvent event = new OutbidEvent(
                        request.getAuctionId(),
                        prevBid.getBidderUsername(),
                        prevBid.getAmount(),
                        request.getAmount(),
                        bidderUsername
                );
                System.out.println("Publishing OUTBID event: outbidUsername=" + event.outbidUsername() + " | newBidder=" + bidderUsername);
                rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_OUTBID, event);
            } else {
                System.out.println("Skipped outbid event - bidder outbid themselves");
            }
        });

        BidResponse response = new BidResponse(saved);
//        Broadcast the new bid to everyone watching this auction in real time
        webSocketPublisher.publishNewBid(response);

        return response;
    }

    @GetMapping("/auction/{auctionId}")
    public List<BidResponse> getBidsForAuction(Long auctionId) {
        return bidRepository.findByAuctionIdOrderByAmountDesc(auctionId)
                .stream()
                .map(BidResponse::new)
                .toList();
    }

    public List<BidResponse> getBidsByUser(String username) {
        return bidRepository.findByBidderUsernameOrderByPlacedAtDesc(username)
                .stream()
                .map(BidResponse::new)
                .toList();
    }
}
