package com.bidsphere.api_gateway.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.cloud.client.loadbalancer.LoadBalancerInterceptor;
import org.springframework.cloud.gateway.server.mvc.config.GatewayMvcProperties;
import org.springframework.cloud.gateway.server.mvc.handler.ProxyExchange;
import org.springframework.cloud.gateway.server.mvc.handler.RestClientProxyExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestClient;

@Configuration
public class LoadBalancerConfig {

    @Bean
    public RestClient loadBalancedRestClient(LoadBalancerInterceptor loadBalancerInterceptor) {
        return RestClient.builder()
                .requestInterceptor(loadBalancerInterceptor)
                .build();
    }

    @Bean
    public ProxyExchange restClientProxyExchange(RestClient loadBalancedRestClient, GatewayMvcProperties properties) {
        return new RestClientProxyExchange(loadBalancedRestClient, properties);
    }

}
