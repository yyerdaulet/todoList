package com.example.demo.jira.task;

import com.example.demo.jira.project.ProjectRepository;
import com.example.demo.jira.task.Dto.TaskRequest;
import com.example.demo.jira.task.Dto.TaskResponse;
import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.page.Page;
import com.example.demo.jira.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository repository;
    private final TaskMapper mapper;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @LogExecutionTime
    public TaskResponse getTaskById(Long id){
        TaskEntity taskEntity = repository.
                findById(id).
                orElseThrow(() -> new EntityNotFoundException("Not found task with id : " + id));
        return mapper.toDomain(taskEntity);
    }

    @LogExecutionTime
    public List<TaskResponse> getAllTasks(Long project_id){
        return repository.findByProjectId(project_id).stream()
                .map(mapper::toDomain).toList();
    }

    @LogExecutionTime
    public TaskResponse createTask(Long user_id,Long project_id,TaskRequest taskToCreate){
        var user = userRepository.findById(user_id).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
        var project = projectRepository.findById(project_id).orElseThrow(
                () -> new EntityNotFoundException("Project not found")
        );
        var taskToSave = new TaskEntity(
                null,
                taskToCreate.title(),
                Status.NEW,
                user,
                project,
                null
        );
        repository.save(taskToSave);
        return mapper.toDomain(taskToSave);
    }

    @LogExecutionTime
    public TaskResponse updateTask(Long id, TaskRequest taskToUpdate){
        if(!repository.existsById(id)) {
            throw new EntityNotFoundException("Not found any task with such id");
        }

        var task = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Task not found")
        );
        task.setTitle(taskToUpdate.title());
        task.setStatus(Status.CHANGED);
        repository.save(task);
        return mapper.toDomain(task);
    }


    @LogExecutionTime
    public void deleteTask(Long id){
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Not found task with id: " +id);
        }
        repository.deleteById(id);
    }


}
