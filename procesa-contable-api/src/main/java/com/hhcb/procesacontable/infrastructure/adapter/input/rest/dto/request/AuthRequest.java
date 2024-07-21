package com.hhcb.procesacontable.infrastructure.adapter.input.rest.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    private String email;
    private String password;
}
