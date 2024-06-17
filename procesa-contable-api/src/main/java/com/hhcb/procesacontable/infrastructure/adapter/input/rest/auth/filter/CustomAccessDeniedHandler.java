package com.hhcb.procesacontable.infrastructure.adapter.input.rest.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hhcb.procesacontable.infrastructure.util.ErrorCatalog;
import com.hhcb.procesacontable.infrastructure.util.ErrorResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component("customAccessDeniedHandler")
@AllArgsConstructor
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    private final ObjectMapper objectMapper;

    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getOutputStream()
                .println(objectMapper.writeValueAsString(
                        ErrorResponseUtil.createErrorResponse
                                (ErrorCatalog.UNAUTHORIZED, accessDeniedException.getMessage())
                ));
    }
}
