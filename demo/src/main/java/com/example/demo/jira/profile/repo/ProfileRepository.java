package com.example.demo.jira.profile.repo;

import com.example.demo.jira.profile.model.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity,Long> {
}
