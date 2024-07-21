package com.hhcb.procesacontable.infrastructure.config;

import com.hhcb.procesacontable.application.ports.output.ConfigPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConfigAdapter implements ConfigPort {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    @Value("${spring.application.name}")
    private String applicationName;

    @Override
    public String getSecretKey() {
        return secretKey;
    }

    @Override
    public long getJwtExpiration() {
        return jwtExpiration;
    }

    @Override
    public String getApplicationName() {
        return applicationName;
    }
}