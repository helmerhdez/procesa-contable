package com.hhcb.procesacontable.application.ports.output.user;

import com.hhcb.procesacontable.domain.model.UserModel;

import java.util.List;
import java.util.Optional;

public interface UserPersistencePort {
    Optional<UserModel> findById(String id);

    Optional<UserModel> findByEmail(String email);

    List<UserModel> findAll();

    UserModel save(UserModel user);

    void deleteById(String id);
}
