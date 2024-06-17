package com.hhcb.procesacontable.infrastructure.util;

import com.hhcb.procesacontable.domain.model.ErrorResponse;

import java.time.LocalDateTime;
import java.util.List;

public class ErrorResponseUtil {
    private ErrorResponseUtil() {
    }

    public static ErrorResponse createErrorResponse(ErrorCatalog errorCatalog, String message) {
        return ErrorResponse.builder()
                .code(errorCatalog.getCode())
                .status(errorCatalog.getStatus())
                .message(message)
                .timestamp(LocalDateTime.now().toString())
                .build();
    }

    public static ErrorResponse createErrorResponse(ErrorCatalog errorCatalog, List<String> details) {
        return ErrorResponse.builder()
                .code(errorCatalog.getCode())
                .status(errorCatalog.getStatus())
                .message(errorCatalog.getMessage())
                .details(details.isEmpty() ? null : details)
                .timestamp(LocalDateTime.now().toString())
                .build();
    }

    public static ErrorResponse createErrorResponse(ErrorCatalog errorCatalog) {
        return ErrorResponse.builder()
                .code(errorCatalog.getCode())
                .status(errorCatalog.getStatus())
                .message(errorCatalog.getMessage())
                .timestamp(LocalDateTime.now().toString())
                .build();
    }
}
