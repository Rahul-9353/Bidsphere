package com.bidsphere.auction_service.repository;

import com.bidsphere.auction_service.entity.Auction;
import com.bidsphere.auction_service.entity.AuctionStatus;
import org.springframework.data.repository.CrudRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface AuctionRepository extends CrudRepository<Auction, Long> {
    List<Auction> findByStatus(AuctionStatus status);
    List<Auction> findBySellerUsername(String sellerUsername);
    List<Auction> findByCategory(String category);

    List<Auction> findByStatusAndTitleContainingIgnoreCase(AuctionStatus status, String title);
    List<Auction> findByStatusAndCategory(AuctionStatus status, String category);
}
