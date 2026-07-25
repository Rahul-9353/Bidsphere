package com.bidsphere.auction_service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UpdateHighestBidRequest {

    @NotNull
    private BigDecimal newHighestBid;
}
