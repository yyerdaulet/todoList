package com.example.demo.jira.integrations.ProfileImage.service;

import com.example.demo.jira.integrations.fileStorage.FileStorageService;
import com.example.demo.jira.integrations.fileStorage.ProfileFileResponse;
import com.example.demo.jira.items.profile.mapper.ProfileMapper;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.profile.repo.ProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@AllArgsConstructor
public class ProfileImageService {
    private final ProfileRepository repository;
    private final FileStorageService fileService;
    private final ProfileMapper mapper;

    public ProfileFileResponse uploadProfileImage(Long id, MultipartFile file) throws IOException {
        ProfileEntity profile = repository.findById(id).orElseThrow(
                () ->  new EntityNotFoundException("Profile not found")
        );

        String fileName = fileService.saveFile(file);
        profile.setProfileImage(fileName);

        repository.save(profile);

        return mapper.toProfileFileResponse(id,fileName);
    }

    public Resource getImage(Long profileId) throws MalformedURLException {
        ProfileEntity profile = repository.findById(profileId)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Profile Not Found : " + profileId
                        )
                );
        String filename = profile.getProfileImage();

        Path path = Paths.get(System.getProperty("user.home") + "/Downloads/uploads/").resolve(filename);

        return new UrlResource(path.toUri());
    }
}
