package com.bidsphere.bidding_service.service;

import com.bidsphere.bidding_service.dto.BidResponse;
import com.bidsphere.bidding_service.dto.PlaceBidRequest;
import com.bidsphere.bidding_service.entity.Bid;
import com.bidsphere.bidding_service.feign.AuctionClient;
import com.bidsphere.bidding_service.repository.BidRepository;
import com.bidsphere.bidding_service.websocket.BidWebSocketPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BidService {

    private final BidRepository bidRepository;
    private final AuctionClient auctionClient;
    private final BidWebSocketPublisher webSocketPublisher;

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

        Bid bid = new Bid();
        bid.setAuctionId(request.getAuctionId());
        bid.setBidderUsername(bidderUsername);
        bid.setAmount(request.getAmount());

        Bid saved = bidRepository.save(bid);

        auctionClient.updateHighestBid(request.getAuctionId(),
                new AuctionClient.UpdateHighestBidRequest(request.getAmount()));

        BidResponse response = new BidResponse(saved);
//        Broadcast the new bid to everyone watching this auction in real time
        webSocketPublisher.publishNewBid(response);

        return response;
    }

    public List<BidResponse> getBidsForAuction(Long auctionId) {
        return bidRepository.findByAuctionIdOrderByAmountDesc(auctionId)
                .stream()
                .map(BidResponse::new)
                .toList();
    }
}
