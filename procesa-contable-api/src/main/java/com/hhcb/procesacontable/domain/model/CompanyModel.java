package com.hhcb.procesacontable.domain.model;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyModel {
    private String companyId;
    private Long nit;
    private String name;
}
