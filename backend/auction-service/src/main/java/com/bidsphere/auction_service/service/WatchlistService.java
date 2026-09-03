package com.bidsphere.auction_service.service;

import com.bidsphere.auction_service.dto.AuctionResponse;
import com.bidsphere.auction_service.entity.Auction;
import com.bidsphere.auction_service.entity.WatchlistItem;
import com.bidsphere.auction_service.repository.AuctionRepository;
import com.bidsphere.auction_service.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final AuctionRepository auctionRepository;

    public void addToWatchlist(String username, Long auctionId){
        if (watchlistRepository.existsByUsernameAndAuctionId(username,auctionId)){
            return;
        }
        WatchlistItem item = new WatchlistItem();
        item.setUsername(username);
        item.setAuctionId(auctionId);
        watchlistRepository.save(item);
    }

    @Transactional
    public void removeFromWatchlist(String username, Long auctionId){
        watchlistRepository.deleteByUsernameAndAuctionId(username,auctionId);
    }

    public boolean isWatching(String username, Long auctionId){
        return watchlistRepository.existsByUsernameAndAuctionId(username,auctionId);
    }

    public List<AuctionResponse> getWatchlist(String username){
        List<Long> auctionIds = watchlistRepository.findByUsername(username)
                .stream().map(WatchlistItem::getAuctionId).toList();

        Iterable<Auction> auctions = auctionRepository.findAllById(auctionIds);

        return StreamSupport.stream(auctions.spliterator(), false)
                .map(AuctionResponse::new)
                .toList();
    }
}
