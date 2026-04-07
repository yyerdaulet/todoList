package com.example.demo.jira.items.lab.controller;

import com.example.demo.jira.items.lab.dto.LabCreateRequest;
import com.example.demo.jira.items.lab.dto.LabResponse;
import com.example.demo.jira.items.lab.services.LabService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@EnableMethodSecurity
@RequestMapping("/labs")
public class LabController {
    private final LabService service;


    @GetMapping
    public ResponseEntity<List<LabResponse>> getAllLabs(){

        return ResponseEntity.status(HttpStatus.OK).body(service.getAllLabs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabResponse> getLab(
            @PathVariable Long id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.getLab(id));
    }

    @PostMapping()
    public ResponseEntity<LabResponse> createLab(
            @RequestBody LabCreateRequest request
            ){
        return ResponseEntity.status(HttpStatus.OK).body(service.createLab(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<LabResponse> updateLab(
            @RequestBody LabCreateRequest request,
            @PathVariable Long lab_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.updateLab(lab_id,request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLab(
            @PathVariable Long lab_id
    ){
        service.deleteLab(lab_id);
        return ResponseEntity.status(HttpStatus.OK).build();
             }
}
