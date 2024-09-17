package com.hhcb.procesacontable.application.ports.input.user;

import com.hhcb.procesacontable.domain.model.UserModel;

import java.util.List;

public interface UserUseCasePort {

    UserModel findById(String id);

    UserModel findByEmail(String email);

    List<UserModel> findAll();

    Boolean save(UserModel user);

    UserModel update(String id, UserModel user);

    void deleteById(String id);
}
