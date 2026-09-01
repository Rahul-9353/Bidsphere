package com.bidsphere.auction_service.controller;

import com.bidsphere.auction_service.dto.AuctionResponse;
import com.bidsphere.auction_service.dto.CreateAuctionRequest;
import com.bidsphere.auction_service.dto.UpdateHighestBidRequest;
import com.bidsphere.auction_service.service.AuctionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auctions")
@RequiredArgsConstructor
public class AuctionController {

    private final AuctionService auctionService;

    @PostMapping
    public ResponseEntity<AuctionResponse> createAuction(
            @Valid @RequestBody CreateAuctionRequest request,
            @RequestHeader("X-Username") String sellerUsername) {
        return ResponseEntity.ok(auctionService.createAuction(request, sellerUsername));
    }

    @GetMapping
    public ResponseEntity<?> getAllActiveAuctions() {
        return ResponseEntity.ok(auctionService.getAllActiveAuctions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuctionResponse> getAuctionById(@PathVariable Long id) {
        return ResponseEntity.ok(auctionService.getAuctionById(id));
    }

    @GetMapping("/seller/{username}")
    public ResponseEntity<?> getAuctionBySeller(@PathVariable String username) {
        return ResponseEntity.ok(auctionService.getAuctionsBySaller(username));
    }

    @PutMapping("/{id}/highest-bid")
    public ResponseEntity<AuctionResponse> updateHighestBid(
            @PathVariable Long id,
            @Valid @RequestBody UpdateHighestBidRequest request) {
        return ResponseEntity.ok(auctionService.updateHighestBid(id, request.getNewHighestBid()));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchAuctions(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sortBy) {
        return ResponseEntity.ok(auctionService.searchAuctions(query, category, sortBy));
    }
}
