package com.hhcb.procesacontable.infrastructure.adapter.output.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "role")
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String roleId;
    @NotBlank(message = "The name cannot be blank")
    @Size(max = 255, message = "The name must have a maximum of 255 characters")
    private String name;
}
