package com.hhcb.procesacontable.infrastructure.adapter.input.rest.user;

import com.hhcb.procesacontable.application.ports.input.user.UserUseCasePort;
import com.hhcb.procesacontable.domain.model.UserModel;
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
    public ResponseEntity<List<UserResponse>> findAll() {
        log.info("findAll: " + userPort.findAll().toString());
        return ResponseEntity.status(HttpStatus.OK).body(userPort.findAll().stream().map(
                legalRepresentativeModel -> modelMapper.map(
                        legalRepresentativeModel, UserResponse.class)
        ).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(
                modelMapper.map(userPort.findById(id), UserResponse.class));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(
            @Valid @RequestBody UserCreateRequest request, @PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(
                modelMapper.map(
                        userPort.update(id, modelMapper.map(request, UserModel.class)),
                        UserResponse.class));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        userPort.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
