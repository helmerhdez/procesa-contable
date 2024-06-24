package com.hhcb.procesacontable.infrastructure.adapter.input.rest.auth;

import com.hhcb.procesacontable.application.ports.input.auth.AuthUseCasePort;
import com.hhcb.procesacontable.domain.model.AuthModel;
import com.hhcb.procesacontable.domain.model.UserModel;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.ApiResponse;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.auth.dto.request.AuthRequest;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.auth.dto.response.AuthResponse;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.user.dto.request.UserCreateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthUseCasePort authPort;
    private final ModelMapper mapper;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody UserCreateRequest request) {
        UserModel userModel = mapper.map(request, UserModel.class);
        AuthResponse authResponse = mapper.map(authPort.register(userModel), AuthResponse.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(authResponse)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticate(@RequestBody AuthRequest authUser) {
        AuthModel authModel = authPort.authenticate(mapper.map(authUser, UserModel.class));
        AuthResponse response = mapper.map(authModel, AuthResponse.class);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(response));
    }

}
