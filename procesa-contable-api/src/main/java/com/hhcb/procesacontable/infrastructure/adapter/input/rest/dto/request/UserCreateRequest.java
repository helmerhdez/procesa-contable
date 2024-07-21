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
    @Size(min = 6, max = 255, message = "The password must be at least 6 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%?&*\\-])[A-Za-z\\d@$!%?&*\\-]{6,}$",
            message = "Password must contain at least one special character, one uppercase letter, " +
                    "one lowercase letter, and one digit")
    private String password;
    @NotNull
    private CompanyRequest company;
    @NotNull
    private RoleRequest role;
}
