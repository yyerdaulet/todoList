package com.example.demo.jira.items.profile.repo;

import com.example.demo.jira.items.profile.model.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.*;


@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity,Long>, JpaSpecificationExecutor<ProfileEntity> {

    List<ProfileEntity> findByLabId(Long labId);

    List<ProfileEntity> findAllByOrcidIn(Collection<String> listOrcid);
}
