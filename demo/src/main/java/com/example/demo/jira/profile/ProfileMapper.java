package com.example.demo.jira.profile;

import com.example.demo.jira.project.ProjectEntity;
import com.example.demo.jira.profile.Dto.ProfileCreateResponse;
import com.example.demo.jira.profile.Dto.ProfileResponse;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper {
    public ProfileResponse toDomain(ProfileEntity profile){
        return new ProfileResponse(
                profile.getId(),
                profile.getName(),
                profile.getProjects().stream().map(ProjectEntity::getName).toList()
        );
    }

    public ProfileCreateResponse toProfileCreateResponse(ProfileEntity profile){
        return new @Valid ProfileCreateResponse(
                profile.getId(),
                profile.getName(),
                profile.getLastName(),
                profile.getBirthday(),
                profile.getDegree(),
                profile.getUniversity(),
                null
        );
    }

}
