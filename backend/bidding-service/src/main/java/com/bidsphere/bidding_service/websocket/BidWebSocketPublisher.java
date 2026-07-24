package com.bidsphere.bidding_service.websocket;

import com.bidsphere.bidding_service.dto.BidResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BidWebSocketPublisher {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public void publishNewBid(BidResponse bid) {
        String destination = "/topic/auctions/" + bid.getAuctionId();
        simpMessagingTemplate.convertAndSend(destination, bid);
    }
}
