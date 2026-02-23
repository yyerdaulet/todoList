package com.example.demo.jira.project;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.profile.ProfileEntity;
import com.example.demo.jira.project.dto.*;
import com.example.demo.jira.profile.ProfileRepository;
import com.example.demo.jira.user.UserEntity;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository repository;
    private final ProjectMapper mapper;
    private final ProfileRepository profileRepository;



    @LogExecutionTime()
    public List<ProjectResponse> getAllProjects(Long user_id) {
        return repository.
                findByProfileId(user_id).
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

    @Transactional
    @LogExecutionTime()
    public ProjectCreateResponse createProject(Long profile_id, ProjectRequest request) {
        var userEntity = profileRepository.findById(profile_id).orElseThrow(
                () -> new EntityNotFoundException("Profile not found")
        );

        var newProject = new ProjectEntity(
                null,
                request.name(),
                userEntity,
                null,
                null
        );
        repository.save(newProject);
        return mapper.toProjectCreateResponse(newProject);
    }

    @Transactional
    @LogExecutionTime()
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        var project = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Project not found")
        );
        project.setName(request.name());
        repository.save(project);
        return mapper.toDomain(project);
    }

    @Transactional
    @LogExecutionTime()
    public void deleteProject(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Project not found");
        }
        repository.deleteById(id);
    }

    @Transactional
    @LogExecutionTime
    public ProjectAddAssigneeResponse addAssignee(Long projectId, ProjectAddAssigneeRequest request) {
        ProfileEntity user = profileRepository.findByEmail(request.email())
                .orElseThrow(
                        () -> new EntityNotFoundException("User not found")
                );

        ProjectEntity project = repository.findById(projectId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Project not found")
                );
        var assignee = project.getAssignees();
        assignee.add(user);

        project.setAssignees(assignee);
        repository.save(project);

        return mapper.toProjectAddAssigneeResponse(user);
    }

    public ProjectAssigneesList getAssignee(Long projectId) {
        ProjectEntity project = repository.findById(projectId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Project not found")
                );

        var assignee = project.getAssignees();
        return mapper.toAssigneeList(assignee);
    }
}
