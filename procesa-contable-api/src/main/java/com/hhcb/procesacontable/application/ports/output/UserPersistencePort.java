package com.hhcb.procesacontable.application.ports.output;

import com.hhcb.procesacontable.domain.model.UserModel;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserPersistencePort extends UserDetailsService {
    Optional<UserModel> findById(String id);

    Optional<UserModel> findByEmail(String email);

    List<UserModel> findAll();

    UserModel save(UserModel user);

    void deleteById(String id);
}
