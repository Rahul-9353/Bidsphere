package com.bidsphere.auction_service.currency;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExchangeRateService {

    private final ExchangeRateClient exchangeRateClient;

    private final Map<String, BigDecimal> ratesCache = new ConcurrentHashMap<>();

    @Scheduled(fixedRate = 30 * 60 * 1000, initialDelay = 0)
    public void refreshRates() {
        try {
            ExchangeRateClient.ExchangeRateResponse response = exchangeRateClient.getLatestRates();
            response.rates().forEach((currency, rate) -> ratesCache.put(currency, BigDecimal.valueOf(rate)));
            ratesCache.put("USD", BigDecimal.ONE);
            log.info("Refreshed exchange rates for {} currencies", ratesCache.size());
        } catch (Exception e) {
            log.warn("Failed to refresh exchange rates, using cached values: {}", e.getMessage());
        }
    }

    public BigDecimal convert(BigDecimal amount, String fromCurrency, String toCurrency) {
        if (fromCurrency.equalsIgnoreCase(toCurrency)) {
            return amount;
        }
        BigDecimal fromRate = ratesCache.getOrDefault(fromCurrency.toUpperCase(), BigDecimal.ONE);
        BigDecimal toRate = ratesCache.getOrDefault(toCurrency.toUpperCase(), BigDecimal.ONE);

        BigDecimal amountInUSD = amount.divide(fromRate, 6, java.math.RoundingMode.HALF_UP);
        return amountInUSD.multiply(toRate).setScale(2, java.math.RoundingMode.HALF_UP);
    }

    public Map<String, BigDecimal> getAllRates() {
        return ratesCache;
    }
}
