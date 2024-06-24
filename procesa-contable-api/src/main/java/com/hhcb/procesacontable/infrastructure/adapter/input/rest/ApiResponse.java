package com.hhcb.procesacontable.infrastructure.adapter.input.rest;

import com.hhcb.procesacontable.domain.model.ErrorResponse;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private ErrorResponse error;

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder().success(true).data(data).build();
    }

    public static <T> ApiResponse<T> error(ErrorResponse error) {
        return ApiResponse.<T>builder().success(false).error(error).build();
    }
}
