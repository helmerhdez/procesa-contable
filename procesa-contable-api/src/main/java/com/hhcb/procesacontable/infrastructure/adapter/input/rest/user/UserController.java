package com.hhcb.procesacontable.infrastructure.adapter.input.rest.user;

import com.hhcb.procesacontable.application.ports.input.user.UserUseCasePort;
import com.hhcb.procesacontable.domain.model.UserModel;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.ApiResponse;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.user.dto.request.UserCreateRequest;
import com.hhcb.procesacontable.infrastructure.adapter.input.rest.user.dto.response.UserResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserUseCasePort userPort;
    private final ModelMapper modelMapper;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<UserResponse>>> findAll() {
        List<UserResponse> result = userPort.findAll().stream().map(
                legalRepresentativeModel -> modelMapper.map(
                        legalRepresentativeModel, UserResponse.class)
        ).toList();
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(result));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> findById(@PathVariable String id) {
        UserResponse userResponse = modelMapper.map(userPort.findById(id), UserResponse.class);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(userResponse));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> update(
            @Valid @RequestBody UserCreateRequest request, @PathVariable String id) {
        UserResponse userResponse = modelMapper.map(
                userPort.update(id, modelMapper.map(request, UserModel.class)),
                UserResponse.class);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(userResponse));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        userPort.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(null));
    }
}
