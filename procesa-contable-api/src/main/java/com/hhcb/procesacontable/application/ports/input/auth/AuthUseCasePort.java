package com.hhcb.procesacontable.application.ports.input.auth;

import com.hhcb.procesacontable.domain.model.AuthModel;
import com.hhcb.procesacontable.domain.model.UserModel;

public interface AuthUseCasePort {
    Boolean register(UserModel user);

    AuthModel authenticate(UserModel authUser);
}
