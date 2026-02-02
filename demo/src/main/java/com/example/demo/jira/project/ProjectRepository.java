package com.example.demo.jira.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity,Long> {

    @Query("SELECT p from ProjectEntity p where p.owner.id = :user_id")
    List<ProjectEntity> findByUserId(@Param("user_id") Long user_id);
}
