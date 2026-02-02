package com.example.demo.jira.task;

import com.example.demo.jira.task.Dto.TaskRequest;
import com.example.demo.jira.task.Dto.TaskResponse;
import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.page.Page;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.util.List;


@RestController
@RequestMapping("users/{user_id}/projects/{project_id}/tasks")
public class TaskController {
    private final TaskService taskService;

    private final static Logger log = LoggerFactory.getLogger(TaskController.class);

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }


    @GetMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable("id") Long id
    ){
        return ResponseEntity
                .ok()
                .body(taskService.getTaskById(id));
    }

    @LogExecutionTime
    @GetMapping()
    public ResponseEntity<List<TaskResponse>> getAllTasks(
            @PathVariable("project_id") Long project_id
    ){
        return ResponseEntity.ok().body(taskService.getAllTasks(project_id));
    }

    @LogExecutionTime
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @RequestBody @Valid TaskRequest taskToCreate,
            @PathVariable("user_id") Long user_id,
            @PathVariable("project_id") Long project_id
    ){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                taskService.createTask(user_id, project_id, taskToCreate)
        );
    }

    @LogExecutionTime
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @RequestBody @Valid TaskRequest taskToUpdate,
            @PathVariable Long id
    ){
        return ResponseEntity.ok().body(taskService.updateTask(id,taskToUpdate));
    }


    @LogExecutionTime
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id
    ){
        taskService.deleteTask(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
