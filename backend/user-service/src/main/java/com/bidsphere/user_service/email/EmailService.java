package com.bidsphere.user_service.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.contact-email}")
    private String contactEmail;

    public void sendWelcomeEmail(String toEmail, String username){
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Welcome to BidSphere, " + username + "!");
            message.setText(
                    "Hi " + username + ",\n\n" +
                            "Welcome to BidSphere! Your account has been created successfully.\n\n" +
                            "Start exploring live auctions or list your own item to begin bidding.\n\n" +
                            "Happy bidding!\nThe BidSphere Team"
            );
            mailSender.send(message);
        } catch (Exception ex) {
            log.warn("Failed to send welcome email to {}: {} ", toEmail, ex.getMessage());
        }
    }

    public void sendContactMessage(String fromName, String fromEmail, String subject, String body){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(contactEmail);
        message.setReplyTo(fromEmail);
        message.setSubject("[BidSphere Contact] " + subject);
        message.setText(
                "From: " + fromName + " <" + fromEmail + ">\n\n" + body
        );
        mailSender.send(message);
    }
}
