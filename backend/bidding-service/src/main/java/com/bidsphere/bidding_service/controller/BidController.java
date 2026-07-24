package com.bidsphere.bidding_service.controller;

import com.bidsphere.bidding_service.dto.BidResponse;
import com.bidsphere.bidding_service.dto.PlaceBidRequest;
import com.bidsphere.bidding_service.service.BidService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bids")
@RequiredArgsConstructor
public class BidController {

    private final BidService bidService;

    @PostMapping
    public ResponseEntity<BidResponse> placeBid(
            @Valid @RequestBody PlaceBidRequest request,
            @RequestHeader("X-Username") String bidderUsername) {
        return ResponseEntity.ok(bidService.placeBid(request, bidderUsername));
    }
}
