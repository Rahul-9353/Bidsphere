package com.bidsphere.auction_service.service;

import com.bidsphere.auction_service.dto.AuctionResponse;
import com.bidsphere.auction_service.dto.CreateAuctionRequest;
import com.bidsphere.auction_service.entity.Auction;
import com.bidsphere.auction_service.entity.AuctionStatus;
import com.bidsphere.auction_service.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionService {

    private final AuctionRepository auctionRepository;

    public AuctionResponse createAuction(CreateAuctionRequest request, String sellerUsername) {
        Auction auction = new Auction();
        auction.setTitle(request.getTitle());
        auction.setDescription(request.getDescription());
        auction.setStartingPrice(request.getStartingPrice());
        auction.setCurrentHighestBid(request.getStartingPrice());
        auction.getSellerUsername(sellerUsername);
        auction.setStartTime(request.getStartTime());
        auction.setEndTime(request.getEndTime());
        auction.setImageUrl(request.getImageUrl());
        auction.setCategory(request.getCategory());
        auction.setTags(request.getTags());
        auction.setCurrency(request.getCurrency().toUpperCase());
        auction.setStatus(AuctionStatus.ACTIVE);

        Auction saved = auctionRepository.save(auction);
        return new AuctionResponse(saved);
    }

    public List<AuctionResponse> getAllActiveAuctions() {
        return auctionRepository.findByStatus(AuctionStatus.ACTIVE)
                .stream()
                .map(AuctionResponse::new)
                .toList();
    }

    public AuctionResponse getAuctionById(Long id) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Auction Not Found"));
        return new AuctionResponse(auction);
    }

    public List<AuctionResponse> getAuctionsBySaller(String sellerUsername) {
        return auctionRepository.findBySellerUsername(sellerUsername)
                .stream()
                .map(AuctionResponse::new)
                .toList();
    }
}
