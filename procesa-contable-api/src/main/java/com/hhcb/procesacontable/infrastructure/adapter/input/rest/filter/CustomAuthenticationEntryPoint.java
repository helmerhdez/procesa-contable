package com.hhcb.procesacontable.infrastructure.adapter.input.rest.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.dto.response.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component("customAuthenticationEntryPoint")
@AllArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper;

    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authenticationException) throws IOException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getOutputStream()
                .println(objectMapper.writeValueAsString(
                        ErrorResponse.builder().code("E4002").status(401)
                                .message(authenticationException.getMessage())
                                .timestamp(LocalDateTime.now().toString()).build())
                );
    }
}
