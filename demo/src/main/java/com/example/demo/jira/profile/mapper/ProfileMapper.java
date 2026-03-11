package com.example.demo.jira.profile.mapper;

import com.example.demo.jira.profile.dto.ProfileCreateResponse;
import com.example.demo.jira.profile.dto.ProfileFileResponse;
import com.example.demo.jira.profile.dto.ProfileResponse;
import com.example.demo.jira.profile.model.ProfileEntity;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper {
    public ProfileResponse toDomain(ProfileEntity profile){
        return new ProfileResponse(
                profile.getId(),
                profile.getOrcid(),
                profile.getName(),
                profile.getLastName(),
                profile.getBirthday(),
                profile.getDegree()
        );
    }

    public ProfileCreateResponse toProfileCreateResponse(ProfileEntity profile){
        return new @Valid ProfileCreateResponse(
                profile.getId(),
                profile.getOrcid(),
                profile.getName(),
                profile.getLastName(),
                profile.getBirthday(),
                profile.getDegree()
        );
    }

    public ProfileFileResponse toProfileFileResponse(Long id, String fileName) {
        return new ProfileFileResponse(
                id,
                fileName
        );
    }
}
