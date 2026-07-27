package com.bidsphere.notification_service.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
//import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_NAME = "bid.events";
    public static final String QUEUE_NAME = "outbid.notifications.queue";
    public static final String ROUTING_KEY = "bid.outbid";

    @Bean
    public TopicExchange bidEventsExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue outbidQueue() {
        return new Queue(QUEUE_NAME);
    }

//    Connects the queue to the exchange
    @Bean
    public Binding outbidBinding(Queue outbidQueue, TopicExchange bidEventsExchange) {
        return BindingBuilder.bind(outbidQueue).to(bidEventsExchange).with(ROUTING_KEY);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new JacksonJsonMessageConverter();
    }
}
