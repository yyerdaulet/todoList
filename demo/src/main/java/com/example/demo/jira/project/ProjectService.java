package com.example.demo.jira.project;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.project.dto.ProjectRequest;
import com.example.demo.jira.project.dto.ProjectResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository repository;
    private final ProjectMapper mapper;

    public ProjectService(ProjectRepository repository, ProjectMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @LogExecutionTime()
    public List<ProjectResponse> getAllProjects() {
        return repository.
                findAll().
                stream().
                map(mapper::toDomain).toList();
    }

    @LogExecutionTime()
    public ProjectResponse getProjectById(Long id) {
        var project =  repository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("item not found")
        );
        return mapper.toDomain(project);
    }

    @LogExecutionTime()
    public ProjectResponse createProject(ProjectRequest request) {
        var newProject = new ProjectEntity(
                null,
                request.name(),
                request.owner(),
                request.tasks()
        );
        repository.save(newProject);
        return mapper.toDomain(newProject);
    }

    @LogExecutionTime()
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("item not found");
        }
        var projectToSave = mapper.toEntity(id,request);
        repository.save(projectToSave);
        return mapper.toDomain(projectToSave);
    }

    @LogExecutionTime()
    public void deleteProject(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("item not found");
        }
        repository.deleteById(id);
    }
}
