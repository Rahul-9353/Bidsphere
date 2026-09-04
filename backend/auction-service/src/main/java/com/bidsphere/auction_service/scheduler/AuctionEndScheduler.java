package com.bidsphere.auction_service.scheduler;

import com.bidsphere.auction_service.entity.Auction;
import com.bidsphere.auction_service.entity.AuctionStatus;
import com.bidsphere.auction_service.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuctionEndScheduler {

    private final AuctionRepository auctionRepository;

    @Scheduled(fixedRate = 60 * 1000)
    public void endExpiredAuctions() {
        List<Auction> expired = auctionRepository
                .findByStatusAndEndTimeBefore(AuctionStatus.ACTIVE, LocalDateTime.now());

        if (expired.isEmpty()) {
            return;
        }

        for (Auction auction : expired) {
            auction.setStatus(AuctionStatus.ENDED);
        }
        auctionRepository.saveAll(expired);

        log.info("Auto-ended {} expired auction(s)", expired.size());
    }

}
