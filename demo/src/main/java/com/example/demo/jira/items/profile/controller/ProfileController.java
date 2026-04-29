package com.example.demo.jira.items.profile.controller;
import com.example.demo.jira.integrations.fileStorage.ProfileFileResponse;
import com.example.demo.jira.items.profile.dto.*;
import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.items.profile.service.ProfileService;
import com.example.demo.jira.integrations.pdfService.UserPdfService;
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
@AllArgsConstructor
public class ProfileController {
    private final ProfileService profileService;
    private final UserPdfService userPdfService;

    @GetMapping("/profiles")
    @LogExecutionTime()
    public ResponseEntity<List<ProfileResponse>> getAllProfiles(){
        return ResponseEntity.status(HttpStatus.OK).body(profileService.getAllProfiles());
    }
    
    @LogExecutionTime
    @GetMapping("/labs/{lab_id}/profiles")
    public ResponseEntity<List<ProfileResponse>> getAllProfilesByLabId(
            @PathVariable Long lab_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(profileService.getProfilesByLabId(lab_id));
    }

    @GetMapping("/profiles/{id}")
    @LogExecutionTime()
    public ResponseEntity<ProfileResponse> getProfileById(
            @PathVariable("id") Long id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(profileService.getProfileById(id));
    }

    @GetMapping("/profiles/search")
    @LogExecutionTime
    public ResponseEntity<List<ProfileResponse>> search(
            @RequestParam String query
    ){
        return ResponseEntity.status(HttpStatus.OK).body(profileService.search(query));
    }


    @PostMapping("/profiles")
    @LogExecutionTime()
    public ResponseEntity<ProfileCreateResponse> createProfile(
            @RequestBody @Valid ProfileCrReq profileToCreate
            ){
        return ResponseEntity.status(HttpStatus.CREATED).body(profileService.createProfile(profileToCreate));
    }



    @DeleteMapping("/profiles/{id}")
    @LogExecutionTime()
    public ResponseEntity<Void> deleteProfile(
            @PathVariable("id") Long id
    ){
        profileService.deleteProfile(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
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


}
