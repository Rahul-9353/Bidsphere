package com.bidsphere.bidding_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@FeignClient(name = "auction-service")
public interface AuctionClient {

    @GetMapping("/api/auctions/{id}")
    AuctionDto getAuctionById(@PathVariable("id") Long id);

    @PutMapping("/api/auctions/{id}/highest-bid")
    AuctionDto updateHighestBid(@PathVariable("id") Long id, @RequestBody UpdateHighestBidRequest request);

    record AuctionDto(Long id, String status, BigDecimal currentHighestBid, String sellerUsername, String currency) {}
    record UpdateHighestBidRequest(BigDecimal newHighestBid) {}
}
