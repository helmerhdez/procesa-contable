package com.hhcb.procesacontable.infrastructure.adapter.output.persistence.user;

import com.hhcb.procesacontable.application.ports.output.user.UserPersistencePort;
import com.hhcb.procesacontable.domain.model.UserModel;
import com.hhcb.procesacontable.infrastructure.adapter.output.persistence.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserPersistenceAdapter implements UserPersistencePort {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    /**
     * @param id the id of the user to find
     * @return the user found
     */
    @Override
    public Optional<UserModel> findById(String id) {
        return userRepository.findById(id)
                .map(userEntity ->
                        modelMapper.map(userEntity, UserModel.class));
    }

    /**
     * @param email the email of the user to find
     * @return the user found
     */
    @Override
    public Optional<UserModel> findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userEntity ->
                        modelMapper.map(userEntity, UserModel.class));
    }

    /**
     * @return the list of all users
     */
    @Override
    public List<UserModel> findAll() {
        return userRepository.findAll().stream()
                .map(userEntity ->
                        modelMapper.map(userEntity, UserModel.class))
                .toList();
    }

    /**
     * @param user the user to create
     * @return the user created
     */
    @Override
    public UserModel save(UserModel user) {
        return modelMapper.map(
                userRepository.save(
                        modelMapper.map(user, UserEntity.class)
                ), UserModel.class
        );
    }

    /**
     * @param id the id of the user to delete
     */
    @Override
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }
}
