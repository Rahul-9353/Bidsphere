package com.bidsphere.auction_service.currency;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@FeignClient(name = "exchange-rate-client", url = "https://api.frankfurter.dev/v1")
public interface ExchangeRateClient {

    @GetMapping("/latest?base=USD")
    ExchangeRateResponse getLatestRates();

    record ExchangeRateResponse(String base, String date, Map<String, Double> rates) {}
}
