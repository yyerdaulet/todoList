package com.example.demo.jira.profile;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.profile.Dto.ProfileCrReq;
import com.example.demo.jira.profile.Dto.ProfileCreateResponse;
import com.example.demo.jira.profile.Dto.ProfileRequest;
import com.example.demo.jira.profile.Dto.ProfileResponse;
import com.example.demo.jira.user.UserEntity;
import com.example.demo.jira.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;


@AllArgsConstructor
@Service
public class ProfileService {
    private final ProfileRepository repository;
    private final UserRepository userRepository;
    private final ProfileMapper mapper;

    @LogExecutionTime
    @GetMapping
    public List<ProfileResponse> getAllProfiles() {
        return repository.findAll().stream().map(mapper::toDomain).toList();
    }

    @LogExecutionTime()
    public ProfileCreateResponse getProfileById(Long id) {
        ProfileEntity profile = repository
                .findById(id)
                .orElseThrow( () -> new EntityNotFoundException("Profile Entity not found"));
        return mapper.toProfileCreateResponse(profile);
    }

    @Transactional
    @LogExecutionTime()
    public ProfileCreateResponse createProfile(@Valid ProfileCrReq profileToCreate) {

        UserEntity user = userRepository.findById(profileToCreate.user_id()).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );

        var newProfile = new ProfileEntity(
                null,
                profileToCreate.name(),
                profileToCreate.lastName(),
                profileToCreate.birthday(),
                profileToCreate.degree(),
                profileToCreate.university(),
                null,
                user
        );

        repository.save(newProfile);

        return mapper.toProfileCreateResponse(newProfile);
    }

    @Transactional
    @LogExecutionTime()
    @PutMapping
    public ProfileResponse updateProfile(Long id,
                                      @Valid ProfileRequest profileToUpdate) {
            var user = repository.findById(id).orElseThrow(
                    () -> new EntityNotFoundException("Profile not found")
            );
            user.setName(profileToUpdate.name());
            repository.save(user);
            return mapper.toDomain(user);
    }

    @Transactional
    @LogExecutionTime()
    public void deleteProfile(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Profile found item");
        }
        repository.deleteById(id);

    }
}
