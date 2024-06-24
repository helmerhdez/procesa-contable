package com.hhcb.procesacontable.infrastructure.adapter.output.persistence.user.entity;

import com.hhcb.procesacontable.infrastructure.adapter.output.persistence.company.entity.CompanyEntity;
import com.hhcb.procesacontable.infrastructure.adapter.output.persistence.role.entity.RoleEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "The email must be in a valid format.")
    @Size(max = 255, message = "The email must have a maximum of 255 characters")
    private String email;
    @NotBlank(message = "The name cannot be blank")
    @Size(max = 255, message = "The name must have a maximum of 255 characters")
    private String name;
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 6, max = 255, message = "The password must be at least 6 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%?&*\\-])[A-Za-z\\d@$!%?&*\\-]{6,}$",
            message = "Password must contain at least one special character, one uppercase letter, " +
                    "one lowercase letter, and one digit")
    private String password;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id")
    private CompanyEntity company;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private RoleEntity role;
    private Timestamp createdAt;
}
