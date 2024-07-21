package com.hhcb.procesacontable.infrastructure.adapter.input.rest.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRequest {
    @NotBlank(message = "Field name cannot be blank or null")
    private String companyId;
}
