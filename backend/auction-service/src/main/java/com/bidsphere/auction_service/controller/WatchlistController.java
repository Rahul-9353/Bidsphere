package com.bidsphere.auction_service.controller;

import com.bidsphere.auction_service.dto.AuctionResponse;
import com.bidsphere.auction_service.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/watchlist")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchlistService watchlistService;

    @PostMapping("/{auctionId}")
    public ResponseEntity<Void> add(@PathVariable Long auctionId, @RequestHeader("X-Username") String username) {
        watchlistService.addToWatchlist(username, auctionId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{auctionId}")
    public ResponseEntity<Void> remove(@PathVariable Long auctionId, @RequestHeader("X-Username") String username) {
        watchlistService.removeFromWatchlist(username, auctionId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status/{auctionId}")
    public ResponseEntity<Map<String, Boolean>> status(@PathVariable Long auctionId, @RequestHeader("X-Username") String username) {
        return ResponseEntity.ok(Map.of("watching", watchlistService.isWatching(username, auctionId)));
    }

    @GetMapping
    public ResponseEntity<List<AuctionResponse>> getMyWatchlist(@RequestHeader("X-Username") String username) {
        return ResponseEntity.ok(watchlistService.getWatchlist(username));
    }
}
