package com.hhcb.procesacontable.infrastructure.adapter.input.rest;

import com.hhcb.procesacontable.common.enums.ErrorCatalog;
import com.hhcb.procesacontable.domain.exceptions.UserNotFoundException;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.dto.response.ApiResponse;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.dto.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
@Slf4j
public class AdviceController {

    @ExceptionHandler({NoHandlerFoundException.class})
    public ResponseEntity<ApiResponse<ErrorResponse>> handleNoHandlerFoundException(
            NoHandlerFoundException ex) {
        log.error(ex.getMessage(), ex);
        return ResponseEntity.status(ErrorCatalog.NOT_FOUND.getStatus())
                .body(createErrorResponse(ErrorCatalog.NOT_FOUND));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException ex) {
        log.error(ex.getMessage(), ex);
        List<String> details = ex.getBindingResult().getFieldErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();
        return ResponseEntity.status(ErrorCatalog.BAD_REQUEST.getStatus())
                .body(createErrorResponse(ErrorCatalog.BAD_REQUEST, details));
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleNotFoundException(Exception ex) {
        log.error(ex.getMessage(), ex);
        return ResponseEntity.status(ErrorCatalog.USER_NOT_FOUND.getStatus())
                .body(createErrorResponse(ErrorCatalog.USER_NOT_FOUND));
    }

    private ApiResponse<ErrorResponse> createErrorResponse(ErrorCatalog errorCatalog, List<String> details) {
        return ApiResponse.error(ErrorResponse.builder()
                .code(errorCatalog.getCode())
                .status(errorCatalog.getStatus())
                .message(errorCatalog.getMessage())
                .details(details.isEmpty() ? null : details)
                .timestamp(LocalDateTime.now().toString())
                .build());
    }

    private ApiResponse<ErrorResponse> createErrorResponse(ErrorCatalog errorCatalog) {
        return ApiResponse.error(ErrorResponse.builder()
                .code(errorCatalog.getCode())
                .status(errorCatalog.getStatus())
                .message(errorCatalog.getMessage())
                .timestamp(LocalDateTime.now().toString())
                .build());
    }
}

