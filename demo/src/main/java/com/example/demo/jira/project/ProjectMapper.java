package com.example.demo.jira.project;

import com.example.demo.jira.project.dto.ProjectCreateResponse;
import com.example.demo.jira.project.dto.ProjectRequest;
import com.example.demo.jira.project.dto.ProjectResponse;
import com.example.demo.jira.task.TaskEntity;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {
    public ProjectResponse toDomain(ProjectEntity entity){
        return new ProjectResponse(
                entity.getId(),
                entity.getName(),
                entity.getOwner().getName(),
                entity.getTasks().stream().map(TaskEntity::getTitle).toList()
        );
    }

    public ProjectCreateResponse toProjectCreateResponse(ProjectEntity entity){
        return new ProjectCreateResponse(
                entity.getId(),
                entity.getName(),
                entity.getOwner().getName()
        );
    }



}
