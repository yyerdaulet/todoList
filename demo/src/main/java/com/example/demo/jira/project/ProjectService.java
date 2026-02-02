package com.example.demo.jira.project;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.project.dto.ProjectCreateResponse;
import com.example.demo.jira.project.dto.ProjectRequest;
import com.example.demo.jira.project.dto.ProjectResponse;
import com.example.demo.jira.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository repository;
    private final ProjectMapper mapper;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository repository, ProjectMapper mapper,UserRepository userRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.userRepository = userRepository;
    }

    @LogExecutionTime()
    public List<ProjectResponse> getAllProjects(Long user_id) {
        return repository.
                findByUserId(user_id).
                stream().
                map(mapper::toDomain).toList();
    }

    @LogExecutionTime()
    public ProjectResponse getProjectById(Long id) {
        var project =  repository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Project not found")
        );
        return mapper.toDomain(project);
    }

    @LogExecutionTime()
    public ProjectCreateResponse createProject(Long user_id, ProjectRequest request) {
        var userEntity = userRepository.findById(user_id).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );

        var newProject = new ProjectEntity(
                null,
                request.name(),
                userEntity,
                null
        );
        repository.save(newProject);
        return mapper.toProjectCreateResponse(newProject);
    }

    @LogExecutionTime()
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        var project = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Project not found")
        );
        project.setName(request.name());
        repository.save(project);
        return mapper.toDomain(project);
    }

    @LogExecutionTime()
    public void deleteProject(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Project not found");
        }
        repository.deleteById(id);
    }
}
