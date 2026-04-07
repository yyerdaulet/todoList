package com.example.demo.jira.items.project.services;

import com.example.demo.jira.integrations.RagEventPublisher;
import com.example.demo.jira.items.project.repository.ProjectRepository;
import com.example.demo.jira.items.project.dto.ProjectCreateRequest;
import com.example.demo.jira.items.profile.repo.ProfileRepository;
import com.example.demo.jira.items.project.entity.ProjectEntity;
import com.example.demo.jira.items.project.mapper.ProjectMapper;
import com.example.demo.jira.items.profile.dto.ProfileResponse;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.project.dto.ProjectResponse;
import com.example.demo.jira.items.profile.utils.ProfileUtils;
import com.example.demo.jira.tools.CollectionUtils;

import jakarta.persistence.EntityNotFoundException;
import com.example.demo.jira.log.LogExecutionTime;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository repository;
    private final ProjectMapper mapper;
    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final RagEventPublisher ragEventPublisher;


    @LogExecutionTime
    public List<ProjectResponse> getAllLabProjects(Long lab_id) {
        return null;
    }

    @LogExecutionTime
    public List<ProjectResponse> getAllProfileProjects(Long profileId) {
        return repository.findByAuthors_id(profileId)
                .stream()
                .map(mapper::toDomain).toList();
    }

    public List<ProjectResponse> getAllProjects() {
        return repository.findAll().stream().map(
                mapper::toDomain
        )
                .toList();
    }

    @Transactional
    public ProjectResponse createProject(Long leadId,ProjectCreateRequest request) {
        ProjectEntity newProject = buildProject(leadId,request);

        ProjectEntity savedProject = projectRepository.save(newProject);

        ragEventPublisher.publish("project.created", Map.of(
                "id",savedProject.getId(),
                "title",savedProject.getTitle(),
                "purpose",savedProject.getPurpose(),
                "status",savedProject.getStatus()
        ));

        return mapper.toDomain(savedProject);

    }

    public ProjectResponse getProject(Long projectId) {
        return mapper.toDomain(findProject(projectId));
    }

    private ProjectEntity buildProject(Long leadId,ProjectCreateRequest request){
        ProfileEntity profile = findProfile(leadId);

        Set<ProfileEntity> authors = resolveAuthors(request.authors());
        authors.add(profile);

        ProjectEntity project = mapper.toNewEntity(request);

        project.setLead(profile);

        project.setAuthors(authors);

        return project;
    }

    private Set<ProfileEntity> resolveAuthors(Collection<ProfileResponse> profiles){
        List<String> listOrcid = ProfileUtils.fetchListORCID(profiles);
        return CollectionUtils.toSet(profileRepository.findAllByOrcidIn(listOrcid));
    }

    private  ProfileEntity findProfile(Long profileId){
        return profileRepository.findById(profileId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Profile not found : " + profileId )
                );
    }

    private ProjectEntity findProject(Long projectId){
        return projectRepository.findById(projectId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Project not found : " + projectId)
                );
    }

}
