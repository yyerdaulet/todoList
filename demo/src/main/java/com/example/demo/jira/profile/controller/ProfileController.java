package com.example.demo.jira.profile.controller;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.profile.dto.*;
import com.example.demo.jira.profile.service.OpenAlexService;
import com.example.demo.jira.profile.service.ProfileService;
import com.example.demo.jira.profile.service.pdfService.UserPdfService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@RestController
@RequestMapping("/profiles")
@AllArgsConstructor
public class ProfileController {
    private final ProfileService profileService;
    private final UserPdfService userPdfService;
    private final OpenAlexService openAlexService;

    @GetMapping("/articles")
    public String search(
            @RequestParam String query
    ){
        return openAlexService.searchArticles(query);
    }


    @GetMapping()
    @LogExecutionTime()
    public ResponseEntity<List<ProfileResponse>> getAllProfiles(){
        return ResponseEntity.status(HttpStatus.OK).body(profileService.getAllProfiles());
    }

    @GetMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<ProfileResponse> getProfileById(
            @PathVariable("id") Long id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(profileService.getProfileById(id));
    }

    @GetMapping("/{id}/articles")
    @LogExecutionTime()
    public ResponseEntity<?> getArticles(
        @PathVariable("id") Long id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(profileService.getArticles(id));
    }

    @PostMapping()
    @LogExecutionTime()
    public ResponseEntity<ProfileCreateResponse> createProfile(
            @RequestBody @Valid ProfileCrReq profileToCreate
            ){
        return ResponseEntity.status(HttpStatus.CREATED).body(profileService.createProfile(profileToCreate));
    }

    @PutMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<ProfileResponse> updateProfile(
            @PathVariable Long id,
            @RequestBody @Valid ProfileRequest profileToUpdate
    ){
        return ResponseEntity.status(HttpStatus.OK).body(profileService.updateProfile(id,profileToUpdate));
    }

    @DeleteMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<Void> deleteStudent(
            @PathVariable("id") Long id
    ){
        profileService.deleteStudent(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<ProfileFileResponse> uploadPhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
            ) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(profileService.uploadProfilePhoto(id,file));
    }

    @PostMapping("/{id}/uploadFile")
    public ResponseEntity<ProfileFileResponse> uploadFile(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(profileService.uploadProfileMedicalPage(id,file));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadUserPage(
            @PathVariable Long id
    ){
        byte[] pdf = userPdfService.generateStudentPdf(id);

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=student-info.pdf"
                ).contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/{id}/photo/{filename}")
    public ResponseEntity<Resource> getPhoto(
            @PathVariable("filename") String filename
    ) throws IOException {
        Path path = Paths.get(System.getProperty("user.home") + "/Downloads/uploads/").resolve(filename);
        Resource resource = new UrlResource(path.toUri());
        String contentType = Files.probeContentType(path);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
