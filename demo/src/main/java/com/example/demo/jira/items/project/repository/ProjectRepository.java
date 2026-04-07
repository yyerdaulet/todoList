package com.example.demo.jira.items.project.repository;

import com.example.demo.jira.items.project.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity,Long> {
    List<ProjectEntity> findByAuthors_id(Long Id);
}
