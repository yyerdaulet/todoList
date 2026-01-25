package com.example.demo.jira.project;

import com.example.demo.jira.project.dto.ProjectRequest;
import com.example.demo.jira.project.dto.ProjectResponse;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {
    public ProjectResponse toDomain(ProjectEntity entity){
        return new ProjectResponse(
                entity.getId(),
                entity.getName(),
                entity.getOwner(),
                entity.getTasks()
        );
    }

    public ProjectEntity toEntity(Long id, ProjectRequest request) {
        return new ProjectEntity(
                id,
                request.name(),
                request.owner(),
                request.tasks()
        );
    }
}
