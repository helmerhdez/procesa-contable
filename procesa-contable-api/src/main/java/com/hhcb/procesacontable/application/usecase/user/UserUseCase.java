package com.hhcb.procesacontable.application.usecase.user;

import com.hhcb.procesacontable.application.ports.input.user.UserUseCasePort;
import com.hhcb.procesacontable.application.ports.output.user.UserPersistencePort;
import com.hhcb.procesacontable.domain.exception.user.UserNotFoundException;
import com.hhcb.procesacontable.domain.model.UserModel;
import com.hhcb.procesacontable.infrastructure.util.ErrorCatalog;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The use case for the user
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class UserUseCase implements UserUseCasePort {
    private final UserPersistencePort persistencePort;

    /**
     * @param id the id of the user to find
     * @return the user found
     * @throws UserNotFoundException if the user not found
     */
    @Override
    public UserModel findById(String id) {
        log.info("Searching for user with id {}", id);
        return persistencePort.findById(id).orElseThrow(() -> throwUserNotFoundException(id));
    }

    /**
     * @param email the email of the user to find
     * @return the user found
     * @throws UserNotFoundException if the user not found
     */
    @Override
    public UserModel findByEmail(String email) {
        log.info("Searching for user with id {}", email);
        return persistencePort.findByEmail(email).orElseThrow(() -> throwUserNotFoundException(email));
    }

    /**
     * @return the list of all users
     */
    @Override
    public List<UserModel> findAll() {
        log.info("Searching all users");
        return persistencePort.findAll();
    }

    /**
     * @param user the user to create
     * @return the user created
     */
    @Override
    public UserModel save(UserModel user) {
        log.info("Saving user with id {}", user.getUserId());
        return persistencePort.save(user);
    }

    /**
     * @param id the id of the user
     * @param user the user to update
     * @return the user updated
     * @throws UserNotFoundException if the user is not found
     */
    @Override
    public UserModel update(String id, UserModel user) {
        log.info("Updating user with id {}", id);
        return persistencePort.findById(id).map(savedObject ->
                persistencePort.save(UserModel.builder()
                        .email(savedObject.getEmail())
                        .name(savedObject.getName())
                        .password(savedObject.getPassword())
                        .company(savedObject.getCompany())
                        .role(savedObject.getRole())
                        .build())
        ).orElseThrow(() -> throwUserNotFoundException(id));
    }

    /**
     * @param id the id of the user to delete
     * @throws UserNotFoundException if the user is not found
     */
    @Override
    public void deleteById(String id) {
        log.info("Deleting user with id {}", id);
        persistencePort.findById(id)
                .ifPresentOrElse(
                        user -> persistencePort.deleteById(id),
                        () -> { throw throwUserNotFoundException(id); }
                );
    }

    private UserNotFoundException throwUserNotFoundException(String id) {
        log.error("User with id {} not found", id);
        return new UserNotFoundException(ErrorCatalog.USER_NOT_FOUND.getMessage());
    }
}
