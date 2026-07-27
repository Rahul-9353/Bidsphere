package com.bidsphere.bidding_service.event;

import java.io.Serializable;
import java.math.BigDecimal;

//  Implements Serializable
public record OutbidEvent(
        Long auctionId,
        String outbidUsername,
        BigDecimal previousBidAmount,
        BigDecimal newBidAmount,
        String newBidderUsername
) implements Serializable {}
