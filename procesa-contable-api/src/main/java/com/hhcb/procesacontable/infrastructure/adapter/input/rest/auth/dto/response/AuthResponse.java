package com.hhcb.procesacontable.infrastructure.adapter.input.rest.auth.dto.response;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
}
