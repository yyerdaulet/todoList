package com.example.demo.jira.task;

import com.example.demo.jira.project.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity,Long> {

    @Query(
            """
       select t from TaskEntity t where t.project.id = :project_id
"""
    )
    List<TaskEntity> findByProjectId(@Param("project_id") Long project_id);
}
