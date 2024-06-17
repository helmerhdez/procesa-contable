package com.hhcb.procesacontable.infrastructure.adapter.input.rest.user.dto.response;

import com.hhcb.procesacontable.infrastructure.adapter.input.rest.company.dto.response.CompanyResponse;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.role.dto.response.RoleResponse;
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
