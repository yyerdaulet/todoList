package com.example.demo.jira.profile.service;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.profile.dto.*;
import com.example.demo.jira.profile.model.ProfileEntity;
import com.example.demo.jira.profile.mapper.ProfileMapper;
import com.example.demo.jira.profile.repo.ProfileRepository;
import com.example.demo.jira.user.UserEntity;
import com.example.demo.jira.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@AllArgsConstructor
@Service
public class ProfileService {
    private final ProfileRepository repository;
    private final UserRepository userRepository;
    private final ProfileMapper mapper;
    private final FileStorageService fileService;
    private final OpenAlexService alexService;

    public Object getArticles(Long id) {
        var profile = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Profile not found")
        );
        String orcid = profile.getOrcid();

        return alexService.searchArticles(orcid);
    }


    @LogExecutionTime
    @GetMapping
    public List<ProfileResponse> getAllProfiles() {
        return repository.findAll().stream().map(mapper::toDomain).toList();
    }

    @LogExecutionTime()
    public ProfileResponse getProfileById(Long id) {
        ProfileEntity profile = repository
                .findById(id)
                .orElseThrow( () -> new EntityNotFoundException("Student Entity not found"));
        return mapper.toDomain(profile);
    }

    @Transactional
    @LogExecutionTime()
    public ProfileCreateResponse createProfile(@Valid ProfileCrReq profileToCreate) {

        UserEntity user = userRepository.findById(profileToCreate.user_id()).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );

        var newProfile = new ProfileEntity(
                null,
                profileToCreate.orcid(),
                profileToCreate.name(),
                profileToCreate.lastName(),
                profileToCreate.birthday(),
                profileToCreate.degree(),
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
            var profile = repository.findById(id).orElseThrow(
                    () -> new EntityNotFoundException("Student not found")
            );

            profile.setName(profileToUpdate.name());
            profile.setLastName(profile.getLastName());
            profile.setBirthday(profileToUpdate.birthday());
            profile.setDegree(profileToUpdate.degree());

            repository.save(profile);
            return mapper.toDomain(profile);
    }

    @Transactional
    @LogExecutionTime()
    public void deleteStudent(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Profile not found ");
        }
        UserEntity user = userRepository.findById(id)
                        .orElseThrow(
                                () -> new EntityNotFoundException("User not found")
                        );
        user.setProfile(null);
        userRepository.save(user);
        repository.deleteById(id);

    }


    public ProfileFileResponse uploadProfilePhoto(Long id, MultipartFile file) throws IOException {
        ProfileEntity profile = repository.findById(id).orElseThrow(
                () ->  new EntityNotFoundException("Profile not found")
        );

        String fileName = fileService.saveFile(file);

        repository.save(profile);

        return mapper.toProfileFileResponse(id,fileName);
    }

    public ProfileFileResponse uploadProfileMedicalPage(Long id, MultipartFile file) throws IOException {
        ProfileEntity profile = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Student not found")
        );

        String fileName = fileService.saveFile(file);

        repository.save(profile);

        return mapper.toProfileFileResponse(id,fileName);
    }


}
