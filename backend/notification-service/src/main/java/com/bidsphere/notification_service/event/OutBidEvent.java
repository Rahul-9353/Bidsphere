package com.bidsphere.notification_service.event;

import java.io.Serializable;
import java.math.BigDecimal;

public record OutBidEvent(
    Long auctionId,
    String outbidUsername,
    BigDecimal previousBidAmount,
    BigDecimal newBidAmount,
    String newBidderUsername
) implements Serializable {}
