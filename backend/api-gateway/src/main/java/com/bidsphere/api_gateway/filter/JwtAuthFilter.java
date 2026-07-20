package com.bidsphere.api_gateway.filter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.HandlerFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import javax.crypto.SecretKey;

@Component
public class JwtAuthFilter implements HandlerFilterFunction<ServerResponse, ServerResponse> {
    private static final String SECRET = "bidsphere-super-secret-key-min-32-characters-long-2026";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

//    Routes that don't require a token
    private static final String[] PUBLIC_PATHS = {
            "/api/users/register",
            "/api/users/login",
    };

    @Override
    public ServerResponse filter(ServerRequest request, HandlerFunction<ServerResponse> next) throws Exception {
        String path = request.path();

//        Skip token check entirely for public endpoints
        for (String publicPath : PUBLIC_PATHS) {
            if (path.equals(publicPath)) {
                return next.handle(request);
            }
        }

        String authHeader = request.headers().firstHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ServerResponse.status(401).body("Missing Authorization Header");
        }

        String token = authHeader.substring(7);

        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
        } catch (Exception e) {
            return ServerResponse.status(401).body("Invalid Token");
        }

        return next.handle(request);
    }
}
