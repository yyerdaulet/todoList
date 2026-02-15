package com.example.demo.jira.profile;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.profile.Dto.ProfileCreateResponse;
import com.example.demo.jira.profile.Dto.ProfileRequest;
import com.example.demo.jira.profile.Dto.ProfileResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/profiles")
public class ProfileController {
    private final ProfileService profileService;

    private final static Logger log = LoggerFactory.getLogger(ProfileController.class);

    public ProfileController(ProfileService profileService) {this.profileService = profileService;}

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

    @PostMapping()
    @LogExecutionTime()
    public ResponseEntity<ProfileCreateResponse> createProfile(
            @RequestBody @Valid ProfileRequest profileToCreate
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
    public ResponseEntity<Void> deleteProfile(
            @PathVariable("id") Long id
    ){
        profileService.deleteProfile(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
