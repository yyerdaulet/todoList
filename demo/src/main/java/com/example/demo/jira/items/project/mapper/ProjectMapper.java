package com.example.demo.jira.items.project.mapper;

import com.example.demo.jira.items.profile.mapper.ProfileMapper;
import com.example.demo.jira.items.project.dto.ProjectCreateRequest;
import com.example.demo.jira.items.project.dto.ProjectResponse;
import com.example.demo.jira.items.project.entity.ProjectEntity;
import com.example.demo.jira.items.project.enums.Status;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ProjectMapper {
    private ProfileMapper profileMapper;
    public ProjectResponse toDomain(ProjectEntity projectEntity) {
        return new ProjectResponse(
                projectEntity.getId(),
                projectEntity.getTitle(),
                projectEntity.getStatus(),
                projectEntity.getPurpose(),
                null,
                projectEntity.getResult(),
                projectEntity.getAuthors().stream().map(
                    profileMapper::toDomain
                ).toList(),
                projectEntity.getPictures()
        );
    }

    public ProjectEntity toNewEntity(ProjectCreateRequest request){
        return new ProjectEntity(
                null,
                request.title(),
                request.purpose(),
                Status.NEW,
                request.result(),
                null,
                null,
                null,
                null
        );
    }

}
