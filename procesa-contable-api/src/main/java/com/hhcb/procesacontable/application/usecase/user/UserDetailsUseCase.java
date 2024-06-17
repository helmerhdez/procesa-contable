package com.hhcb.procesacontable.application.usecase.user;

import com.hhcb.procesacontable.application.ports.input.user.UserDetailUseCasePort;
import com.hhcb.procesacontable.application.ports.input.user.UserUseCasePort;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsUseCase implements UserDetailUseCasePort {
    private final UserUseCasePort userUseCase;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userUseCase.findByEmail(email);
    }
}
