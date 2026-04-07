package com.example.demo.jira.items.profile.mapper;

import com.example.demo.jira.authentication.repository.UserRepository;
import com.example.demo.jira.items.profile.dto.ProfileCreateResponse;
import com.example.demo.jira.integrations.fileStorage.ProfileFileResponse;
import com.example.demo.jira.items.profile.dto.ProfileResponse;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ProfileMapper {
    private final UserRepository userRepository;

    public ProfileResponse toDomain(ProfileEntity profile){
        return new ProfileResponse(
                profile.getId(),
                profile.getOrcid(),
                profile.getName(),
                profile.getLastName(),
                profile.getBirthday(),
                profile.getDegree(),
                profile.getProfileImage()
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
