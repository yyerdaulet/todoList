package com.example.demo.jira.authentication.repository;


import com.example.demo.jira.authentication.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByEmailIgnoreCase(String email);

    boolean existsByEmail(String email);

    Optional<UserEntity> findByVerificationToken(String token);
}
