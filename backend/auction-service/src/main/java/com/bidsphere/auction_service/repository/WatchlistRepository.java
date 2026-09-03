package com.bidsphere.auction_service.repository;

import com.bidsphere.auction_service.entity.WatchlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WatchlistRepository extends JpaRepository<WatchlistItem, Long> {
    List<WatchlistItem> findByUsername(String username);
    Optional<WatchlistItem> findByUsernameAndAuctionId(String username, Long auctionId);
    boolean existsByUsernameAndAuctionId(String username, Long auctionId);
    void deleteByUsernameAndAuctionId(String username, Long auctionId);
}
