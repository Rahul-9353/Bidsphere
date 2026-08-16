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
        String destination = "/topic/auction/" + bid.getAuctionId();
        System.out.println("Publishing bid to destination: " + destination + " | bid amount: " + bid.getAmount());
        simpMessagingTemplate.convertAndSend(destination, bid);
    }
}
