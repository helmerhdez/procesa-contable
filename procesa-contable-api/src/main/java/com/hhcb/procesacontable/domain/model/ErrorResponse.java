package com.hhcb.procesacontable.domain.model;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ErrorResponse {
    private String code;
    private int status;
    private String message;
    private List<String> details;
    private String timestamp;
}
