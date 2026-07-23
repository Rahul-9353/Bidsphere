package com.bidsphere.auction_service.dto;

import com.bidsphere.auction_service.entity.Auction;
import com.bidsphere.auction_service.entity.AuctionStatus;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class AuctionResponse {
    private final Long id;
    private final String title;
    private final String description;
    private final BigDecimal startingPrice;
    private final BigDecimal currentHighestBid;
    private final String sellerUsername;
    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final AuctionStatus status;
    private final String imageUrl;
    private final String category;
    private final List<String> tags;
    private final String currency;

//    Maps the entity to a response DTO
    public AuctionResponse(Auction auction) {
        this.id = auction.getId();
        this.title = auction.getTitle();
        this.description = auction.getDescription();
        this.startingPrice = auction.getStartingPrice();
        this.currentHighestBid = auction.getCurrentHighestBid();
        this.sellerUsername = auction.getSellerUsername();
        this.startTime = auction.getStartTime();
        this.endTime = auction.getEndTime();
        this.status = auction.getStatus();
        this.imageUrl = auction.getImageUrl();
        this.category = auction.getCategory();
        this.tags = auction.getTags();
        this.currency = auction.getCurrency();
    }
}
