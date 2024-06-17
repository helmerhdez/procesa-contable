package com.hhcb.procesacontable.infrastructure.adapter.input.rest;

import com.hhcb.procesacontable.domain.exception.user.UserNotFoundException;
import com.hhcb.procesacontable.domain.model.ErrorResponse;
import com.hhcb.procesacontable.infrastructure.util.ErrorCatalog;
import com.hhcb.procesacontable.infrastructure.util.ErrorResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.List;

@RestControllerAdvice
@Slf4j
public class ApiExceptionHandler {

    @ExceptionHandler({NoHandlerFoundException.class})
    public ResponseEntity<ErrorResponse> handleNoHandlerFoundException(
            NoHandlerFoundException ex) {
        log.error(ex.getMessage(), ex);
        return ResponseEntity.status(ErrorCatalog.NOT_FOUND.getStatus())
                .body(ErrorResponseUtil.createErrorResponse(ErrorCatalog.NOT_FOUND));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException ex) {
        log.error(ex.getMessage(), ex);
        List<String> details = ex.getBindingResult().getFieldErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();
        return ResponseEntity.status(ErrorCatalog.BAD_REQUEST.getStatus())
                .body(ErrorResponseUtil.createErrorResponse(ErrorCatalog.BAD_REQUEST, details));
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(Exception ex) {
        log.error(ex.getMessage(), ex);
        return ResponseEntity.status(ErrorCatalog.USER_NOT_FOUND.getStatus())
                .body(ErrorResponseUtil.createErrorResponse(ErrorCatalog.USER_NOT_FOUND));
    }
}
