package com.bidsphere.bidding_service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PlaceBidRequest {

    @NotNull
    private Long auctionId;

    @NotNull
    private BigDecimal amount;
}
