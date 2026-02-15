package com.example.demo.jira.project;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.project.dto.ProjectCreateResponse;
import com.example.demo.jira.project.dto.ProjectRequest;
import com.example.demo.jira.project.dto.ProjectResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("profile/{profile_id}/projects")
@RestController()
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("")
    @LogExecutionTime()
    public ResponseEntity<List<ProjectResponse>> getAllProjects(
            @PathVariable("profile_id") Long user_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getAllProjects(user_id));
    }

    @GetMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<ProjectResponse> getProjectById(
            @PathVariable("id") Long id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProjectById(id));
    }

    @PostMapping()
    @LogExecutionTime()
    public ResponseEntity<ProjectCreateResponse> createProject(
            @RequestBody ProjectRequest request,
            @PathVariable("profile_id") Long profile_id
            ){
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(profile_id,request));
    }

    @PutMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable Long id,
            @RequestBody ProjectRequest request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.updateProject(id,request));
    }

    @DeleteMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id
    ){
        projectService.deleteProject(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
