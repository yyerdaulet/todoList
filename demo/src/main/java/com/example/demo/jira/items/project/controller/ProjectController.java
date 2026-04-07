package com.example.demo.jira.items.project.controller;

import com.example.demo.jira.items.project.dto.ProjectResponse;
import com.example.demo.jira.items.project.dto.ProjectCreateRequest;
import com.example.demo.jira.items.project.services.ProjectService;
import com.example.demo.jira.log.LogExecutionTime;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ProjectController {
    private final ProjectService service;
    private final static Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @LogExecutionTime
    @GetMapping("/labs/{lab_id}/projects")
    public ResponseEntity<List<ProjectResponse>> getAllLabProjects(
            @PathVariable Long lab_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.getAllLabProjects(lab_id));
    }

    @LogExecutionTime
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectResponse>> getAllProjects(){
        return ResponseEntity.status(HttpStatus.OK).body(service.getAllProjects());
    }

    @LogExecutionTime
    @GetMapping("/profiles/{profile_id}/projects")
    public ResponseEntity<List<ProjectResponse>> getAllProfileProjects(
            @PathVariable Long profile_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.getAllProfileProjects(profile_id));
    }

    @LogExecutionTime
    @PostMapping("/profiles/{profileId}/projects")
    public ResponseEntity<ProjectResponse> createProject(
            @PathVariable Long profileId,
            @RequestBody ProjectCreateRequest request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.createProject(profileId,request));
    }

    @LogExecutionTime
    @GetMapping("/profiles/{profile_id}/projects/{project_id}")
    public ResponseEntity<ProjectResponse> getProject(
            @PathVariable Long project_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.getProject(project_id));
    }



}
