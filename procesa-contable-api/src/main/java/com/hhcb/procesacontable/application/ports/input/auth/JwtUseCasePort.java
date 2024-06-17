package com.hhcb.procesacontable.application.ports.input.auth;

import com.hhcb.procesacontable.domain.model.UserModel;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.function.Function;

public interface JwtUseCasePort {
    boolean isValid(String token, UserDetails user);

    String extractEmail(String token);

    <T> T extractClaim(String token, Function<Claims, T> resolver);

    String generateToken(UserModel user);
}
