package com.hhcb.procesacontable.infrastructure.adapter.input.rest.dto.response;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String userId;
    private String email;
    private String name;
    private RoleResponse role;
    private CompanyResponse company;
}
