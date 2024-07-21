package com.hhcb.procesacontable.infrastructure.adapter.input.rest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Builder;

@Builder
@Getter
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private T data;

    public static <T> ApiResponse<T> empty() {
        return success(null);
    }

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .data(data)
                .success(true)
                .build();
    }

    public static <T> ApiResponse<T> error(T data) {
        return ApiResponse.<T>builder()
                .success(false)
                .data(data)
                .build();
    }
}
