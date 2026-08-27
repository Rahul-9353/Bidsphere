package com.bidsphere.notification_service.listener;

import com.bidsphere.notification_service.event.OutBidEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import static com.bidsphere.notification_service.config.RabbitMQConfig.QUEUE_NAME;

@Component
@RequiredArgsConstructor
public class OutbidEventListener {

    private final SimpMessagingTemplate messagingTemplate;

    @RabbitListener(queues = QUEUE_NAME)
    public void handleOutbidEvent(OutBidEvent event) {
        System.out.println("Received outbid event: " + event);
//        sends privately to just this one user
        String destination = "/topic/notifications/" + event.outbidUsername();
        messagingTemplate.convertAndSend(destination, event);
    }
}
