package com.hhcb.procesacontable.application.usecase.auth;

import com.hhcb.procesacontable.application.ports.input.auth.AuthUseCasePort;
import com.hhcb.procesacontable.application.ports.input.auth.JwtUseCasePort;
import com.hhcb.procesacontable.application.ports.input.user.UserUseCasePort;
import com.hhcb.procesacontable.domain.model.AuthModel;
import com.hhcb.procesacontable.domain.model.UserModel;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthUseCase implements AuthUseCasePort {
    private final UserUseCasePort userUseCase;
    private final JwtUseCasePort jwtUseCase;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthModel register(UserModel user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserModel registeredUser = userUseCase.save(user);
        return AuthModel.builder().token(jwtUseCase.generateToken(registeredUser)).build();
    }

    public AuthModel authenticate(UserModel authUser) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authUser.getEmail(), authUser.getPassword())
        );
        UserModel user = userUseCase.findByEmail(authUser.getEmail());
        return AuthModel.builder().token(jwtUseCase.generateToken(user)).build();

    }
}
