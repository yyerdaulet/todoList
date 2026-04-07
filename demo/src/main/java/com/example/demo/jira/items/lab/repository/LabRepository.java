package com.example.demo.jira.items.lab.repository;

import com.example.demo.jira.items.lab.entity.LabEntity;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface LabRepository extends JpaRepository<LabEntity,Long> {

}
