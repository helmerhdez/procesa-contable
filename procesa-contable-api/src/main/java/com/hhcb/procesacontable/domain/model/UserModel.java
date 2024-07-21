package com.hhcb.procesacontable.domain.model;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    private String userId;
    private String email;
    private String name;
    private String password;
    private CompanyModel company;
    private RoleModel role;
    private String createdAt;
}
