package com.example.demo.jira.items.task.services;

import com.example.demo.jira.items.profile.dto.ProfileResponse;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.profile.repo.ProfileRepository;
import com.example.demo.jira.items.profile.utils.ProfileUtils;
import com.example.demo.jira.items.project.entity.ProjectEntity;
import com.example.demo.jira.items.project.repository.ProjectRepository;
import com.example.demo.jira.items.task.dto.TaskCreateRequest;
import com.example.demo.jira.items.task.dto.TaskResponse;
import com.example.demo.jira.items.task.dto.TaskUpdateRequest;
import com.example.demo.jira.items.task.entity.TaskEntity;
import com.example.demo.jira.items.task.enums.State;
import com.example.demo.jira.items.task.mapper.TaskMapper;
import com.example.demo.jira.items.task.repository.TaskRepository;
import com.example.demo.jira.tools.CollectionUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final ProjectRepository projectRepository;
    private final ProfileRepository profileRepository;

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll()
                .stream().map(
                        taskMapper::toDomain
                ).toList();
    }

    public List<TaskResponse> getAllProjectTasks(Long project_id) {
        return taskRepository.findAllByProjectId(project_id)
                .stream().map(
                        taskMapper::toDomain
                ).toList();
    }

    public List<TaskResponse> getAllProfileTasks(Long profileId) {
        return taskRepository.findAllByAssignees_Id(profileId)
                .stream().map(
                        taskMapper::toDomain
                ).toList();
    }

    public TaskResponse getTaskById(Long taskId) {
        TaskEntity task = findTask(taskId);

        return taskMapper.toDomain(task);
    }

    public TaskResponse createTask(Long projectId,TaskCreateRequest request) {
        ProjectEntity project = findProject(projectId);

        Set<ProfileEntity> assignee = resolveAssignees(request.assignee());

        TaskEntity task = buildTask(request,project,assignee);

        return taskMapper.toDomain(taskRepository.save(task));
    }

    public TaskResponse updateTask(Long taskId, TaskUpdateRequest updateRequest) {
        TaskEntity task = findTask(taskId);

        task.setDescription(updateRequest.description());
        task.setState(updateRequest.state());
        task.setTitle(updateRequest.title());
        task.setStart(updateRequest.start());
        task.setFinish(updateRequest.finish());

        taskRepository.save(task);

        return taskMapper.toDomain(task);
    }

    public void deleteTask(Long taskId) {
        validateTaskExist(taskId);

        taskRepository.deleteById(taskId);
    }

    public TaskResponse completeTask(Long taskId) {
        TaskEntity task = findTask(taskId);

        task.setState(State.DONE);

        TaskEntity savedTask = taskRepository.save(task);

        return taskMapper.toDomain(savedTask);
    }

    private void validateTaskExist(Long taskId){
        if(!taskRepository.existsById(taskId)){
            throw new EntityNotFoundException("Task Not Found : " + taskId);
        }
    }

    private TaskEntity buildTask(TaskCreateRequest request,ProjectEntity project,Set<ProfileEntity> assignees){
        TaskEntity task = taskMapper.toEntity(request);
        task.setAssignees(assignees);
        task.setProject(project);
        return task;
    }

    private TaskEntity findTask(Long taskId){
        return taskRepository.findById(taskId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Task not found : " + taskId)
                );
    }

    private ProjectEntity findProject(Long projectId){
        return projectRepository.findById(projectId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Project not found : " + projectId)
                );
    }

    private Set<ProfileEntity> resolveAssignees(Collection<ProfileResponse> profiles){
        return findProfilesByOrcid(ProfileUtils.fetchListORCID(profiles));
    }

    private Set<ProfileEntity> findProfilesByOrcid(Collection<String> orcidGroup){
        return CollectionUtils.toSet(profileRepository.findAllByOrcidIn(orcidGroup));
    }
}
