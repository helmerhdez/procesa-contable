package com.hhcb.procesacontable.infrastructure.adapter.output.persistence;

import com.hhcb.procesacontable.infrastructure.adapter.output.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);
}
