package com.hhcb.procesacontable.infrastructure.adapter.input.rest.role.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoleRequest {
    @NotBlank(message = "Field role_id cannot be blank or null")
    private String roleId;
}
