package com.hhcb.procesacontable.infrastructure.util;

import com.hhcb.procesacontable.domain.model.ErrorResponse;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.ApiResponse;

import java.time.LocalDateTime;
import java.util.List;

public class ErrorResponseUtil {
    private ErrorResponseUtil() {
    }

    public static ApiResponse<ErrorResponse> createErrorResponse(ErrorCatalog errorCatalog, String message) {
        return ApiResponse.error(ErrorResponse.builder()
                .code(errorCatalog.getCode())
                .status(errorCatalog.getStatus())
                .message(message)
                .timestamp(LocalDateTime.now().toString())
                .build());
    }

    public static ApiResponse<ErrorResponse> createErrorResponse(ErrorCatalog errorCatalog, List<String> details) {
        return ApiResponse.error(ErrorResponse.builder()
                .code(errorCatalog.getCode())
                .status(errorCatalog.getStatus())
                .message(errorCatalog.getMessage())
                .details(details.isEmpty() ? null : details)
                .timestamp(LocalDateTime.now().toString())
                .build());
    }

    public static ApiResponse<ErrorResponse> createErrorResponse(ErrorCatalog errorCatalog) {
        return ApiResponse.error(ErrorResponse.builder()
                .code(errorCatalog.getCode())
                .status(errorCatalog.getStatus())
                .message(errorCatalog.getMessage())
                .timestamp(LocalDateTime.now().toString())
                .build());
    }
}
