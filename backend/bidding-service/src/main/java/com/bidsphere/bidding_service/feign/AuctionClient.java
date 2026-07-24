package com.bidsphere.bidding_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;

@FeignClient(name = "auction-service")
public interface AuctionClient {

    @GetMapping("/api/auctions/{id}")
    AuctionDto getAuctionById(@PathVariable("id") Long id);

    record AuctionDto(Long id, String status, BigDecimal currentHighestBid, String sellerUsername, String currency) {}
}
