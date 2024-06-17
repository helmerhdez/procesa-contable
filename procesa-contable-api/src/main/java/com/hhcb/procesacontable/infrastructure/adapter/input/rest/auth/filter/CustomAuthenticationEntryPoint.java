package com.hhcb.procesacontable.infrastructure.adapter.input.rest.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hhcb.procesacontable.infrastructure.util.ErrorCatalog;
import com.hhcb.procesacontable.infrastructure.util.ErrorResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

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
                        ErrorResponseUtil.createErrorResponse
                                (ErrorCatalog.UNAUTHORIZED, authenticationException.getMessage())
                ));
    }
}
