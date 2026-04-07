package com.example.demo.jira.integrations.ProfileImage.controller;

import com.example.demo.jira.integrations.ProfileImage.service.ProfileImageService;
import com.example.demo.jira.integrations.fileStorage.ProfileFileResponse;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@AllArgsConstructor
public class ProfileImageController {
    private final ProfileImageService imageService;


    @PostMapping("/profiles/{profile_id}/image")
    public ResponseEntity<ProfileFileResponse> uploadImage(
            @PathVariable Long profile_id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        System.out.println(profile_id);
        return ResponseEntity.status(HttpStatus.OK).body(imageService.uploadProfileImage(profile_id,file));
    }

    @GetMapping("/profiles/{profile_id}/image")
    public ResponseEntity<Resource> getImage(
        @PathVariable Long profile_id
    ) throws IOException {
        System.out.println(profile_id);

        Resource resource = imageService.getImage(profile_id);

        String contentType = Files.probeContentType(resource.getFilePath());

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
