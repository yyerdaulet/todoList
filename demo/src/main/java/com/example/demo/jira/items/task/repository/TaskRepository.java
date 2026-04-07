package com.example.demo.jira.items.task.repository;

import com.example.demo.jira.items.task.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity,Long> {
    List<TaskEntity> findAllByProjectId(Long projectId);

    List<TaskEntity> findAllByAssignees_Id(Long profileId);
}
