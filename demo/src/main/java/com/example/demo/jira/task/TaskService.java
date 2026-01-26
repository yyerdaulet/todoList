package com.example.demo.jira.task;

import com.example.demo.jira.task.Dto.TaskRequest;
import com.example.demo.jira.task.Dto.TaskResponse;
import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.page.Page;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository repository;
    private final TaskMapper mapper;

    public TaskService(TaskRepository repository, TaskMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @LogExecutionTime
    public TaskResponse getTaskById(Long id){
        TaskEntity taskEntity = repository.
                findById(id).
                orElseThrow(() -> new EntityNotFoundException("Not found task with id : " + id));
        return mapper.toDomain(taskEntity);
    }

    @LogExecutionTime
    public List<TaskResponse> getAllTasks(Page page){
        int pageSize = page.pageSize() != null ? page.pageSize() :3;
        int pageNumber = page.pageNumber() != null ? page.pageNumber() :0;
        var pageable = Pageable.ofSize(pageSize).withPage(pageNumber);
        return repository.findAll(pageable).stream()
                .map(mapper::toDomain).toList();
    }

    @LogExecutionTime
    public TaskResponse createTask(TaskRequest taskToCreate){
        var taskToSave = new TaskEntity(
                null,
                taskToCreate.title(),
                taskToCreate.status(),
                taskToCreate.assignee(),
                taskToCreate.comments()
        );
        repository.save(taskToSave);
        return mapper.toDomain(taskToSave);
    }

    @LogExecutionTime
    public TaskResponse updateTask(Long id, TaskRequest taskToUpdate){
        if(!repository.existsById(id)) {
            throw new EntityNotFoundException("Not found any task with such id");
        }

        var taskToSave = mapper.toEntity(id,taskToUpdate);
        var updatedTask = repository.save(taskToSave);
        return mapper.toDomain(updatedTask);
    }


    @LogExecutionTime
    public void deleteTask(Long id){
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Not found task with id: " +id);
        }
        repository.deleteById(id);
    }


}
