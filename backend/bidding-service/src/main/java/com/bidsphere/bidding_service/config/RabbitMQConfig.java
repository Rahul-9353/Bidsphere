package com.bidsphere.bidding_service.config;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;

import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_NAME = "bid.events";
    public static final String ROUTING_KEY_OUTBID = "bid.outbid";

//    A topic exchange lets us route different event types using routing key patterns, without notification-service
//    needing to know about bidding-service directly
    @Bean
    public TopicExchange bidEventsExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new JacksonJsonMessageConverter();
    }
}
