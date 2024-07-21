package com.hhcb.procesacontable.application.usecases.auth;

import com.hhcb.procesacontable.application.ports.input.auth.JwtUseCasePort;
import com.hhcb.procesacontable.application.ports.output.ConfigPort;
import com.hhcb.procesacontable.domain.model.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtUseCase implements JwtUseCasePort {
    private final ConfigPort configPort;
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isValid(String token, UserDetails user) {
        String username = extractEmail(token);
        return username.equals(user.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSigningKey()).build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(UserModel user) {
        return Jwts.builder()
                .issuer(configPort.getApplicationName())
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + configPort.getJwtExpiration()))
                .claims(Map.of(
                        "user_id", user.getUserId(),
                        "name", user.getName(),
                        "company", user.getCompany().getCompanyId(),
                        "role", user.getRole().getName()
                ))
                .signWith(getSigningKey())
                .compact();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(configPort.getSecretKey());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
