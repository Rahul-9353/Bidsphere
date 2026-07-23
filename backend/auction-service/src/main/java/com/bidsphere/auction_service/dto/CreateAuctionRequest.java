package com.bidsphere.auction_service.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CreateAuctionRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    @DecimalMin(value = "0.01", message = "Starting price must be greater than 0")
    private BigDecimal startingPrice;

    @NotNull
    @Future(message = "Start time must be in the future")
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;

    private String imageUrl;

    private String category;

    private List<String> tags;

    @NotBlank
    @Size(min = 3, max = 3, message = "Currency must be a 3-letter ISO code, e.g. USD")
    private String currency;
}
