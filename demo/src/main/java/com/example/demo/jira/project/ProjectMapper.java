package com.example.demo.jira.project;

import com.example.demo.jira.profile.ProfileEntity;
import com.example.demo.jira.project.dto.*;
import com.example.demo.jira.task.TaskEntity;
import org.springframework.stereotype.Component;

import java.util.List;

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

    public ProjectAddAssigneeResponse toProjectAddAssigneeResponse(ProfileEntity entity){
        return new ProjectAddAssigneeResponse(
                entity.getName(),
                entity.getLastName()
        );
    }

    public ProjectAssigneesList toAssigneeList(List<ProfileEntity> assignee){
        return new ProjectAssigneesList(
                assignee
        );
    }


}
