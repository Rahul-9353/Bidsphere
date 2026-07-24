package com.bidsphere.bidding_service.dto;

import com.bidsphere.bidding_service.entity.Bid;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
public class BidResponse {
    private final Long id;
    private final Long auctionId;
    private final String bidderUsername;
    private final BigDecimal amount;
    private final LocalDateTime placedAt;

    public BidResponse(Bid bid) {
        this.id = bid.getId();
        this.auctionId = bid.getAuctionId();
        this.bidderUsername = bid.getBidderUsername();
        this.amount = bid.getAmount();
        this.placedAt = bid.getPlacedAt();
    }
}
