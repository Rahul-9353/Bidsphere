package com.bidsphere.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

@Configuration
public class GatewayConfig {

    //    Any request starting with /api/users/** gets forwarded to "user-service"
    @Bean
    public RouterFunction<ServerResponse> userServiceRoute() {
        return route("user-service")
                .route(path("/api/users/**"), http())
                .before(uri("lb://user-service"))
                .build();
    }

//    Request to /api/bids/** go to bidding-service
    @Bean
    public RouterFunction<ServerResponse> biddingServiceRoute() {
        return route("bidding-service")
                .route(path("/api/bids/**"), http())
                .before(uri("lb://bidding-service"))
                .build();
    }

//    Request to /api/notifications/** go to notification-service
    @Bean
    public RouterFunction<ServerResponse> notificationServiceRoute() {
        return route("notification-service")
                .route(path("/api/notifications/**"), http())
                .before(uri("lb://notification-service"))
                .build();
    }

//    Request to /api/auctions/** go to auction-service
    @Bean
    public RouterFunction<ServerResponse> auctionServiceRoute() {
        return route("auction-service")
                .route(path("/api/auctions/**"), http())
                .before(uri("lb://auction-service"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> currencyRoute() {
        return route("currency-service")
                .route(path("/api/currency/**"), http())
                .before(uri("lb://auction-service"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> contactRoute() {
        return route("contact-service")
                .route(path("/api/contact/**"), http())
                .before(uri("lb://user-service"))
                .build();
    }
}
