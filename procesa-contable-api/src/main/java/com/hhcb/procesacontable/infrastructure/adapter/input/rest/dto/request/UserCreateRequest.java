package com.hhcb.procesacontable.infrastructure.adapter.input.rest.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "The email must be in a valid format.")
    @Size(max = 255, message = "The email must have a maximum of 255 characters")
    private String email;
    @NotBlank(message = "The name cannot be blank")
    @Size(max = 255, message = "The name must have a maximum of 255 characters")
    private String name;
    @NotBlank(message = "The name cannot be blank")
    private String password;
    @NotNull
    private CompanyRequest company;
    @NotNull
    private RoleRequest role;
}
