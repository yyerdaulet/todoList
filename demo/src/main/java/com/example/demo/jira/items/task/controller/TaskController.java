package com.example.demo.jira.items.task.controller;

import com.example.demo.jira.items.task.dto.TaskCreateRequest;
import com.example.demo.jira.items.task.dto.TaskResponse;
import com.example.demo.jira.items.task.dto.TaskUpdateRequest;
import com.example.demo.jira.items.task.services.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class TaskController {
    private TaskService taskService;

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskResponse>> getAllTasks() {
        return ResponseEntity.status(HttpStatus.OK).body(taskService.getAllTasks());
    }

    @GetMapping("/projects/{project_id}/tasks")
    public ResponseEntity<List<TaskResponse>> getAllProjectTasks(
            @PathVariable Long project_id
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(taskService.getAllProjectTasks(project_id));
    }

    @GetMapping("/profiles/{profile_id}/tasks")
    public ResponseEntity<List<TaskResponse>> getAllProfileTasks(
        @PathVariable Long profile_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(taskService.getAllProfileTasks(profile_id));
    }

    @GetMapping("/projects/{project_id}/tasks/{task_id}")
    public ResponseEntity<TaskResponse> getTaskById(
        @PathVariable Long task_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(taskService.getTaskById(task_id));
    }

    @PostMapping("/projects/{project_id}/tasks")
    public ResponseEntity<TaskResponse> createTask(
            @PathVariable Long project_id,
            @RequestBody TaskCreateRequest request
            ){
        return ResponseEntity.status(HttpStatus.OK).body(taskService.createTask(project_id,request));
    }

    @PutMapping("/projects/{project_id}/tasks/{task_id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long task_id,
            @RequestBody TaskUpdateRequest request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(taskService.updateTask(task_id,request));
    }

    @PatchMapping("/projects/{project_id}/tasks/{task_id}/complete")
    public ResponseEntity<TaskResponse> completeTask(
            @PathVariable Long task_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(taskService.completeTask(task_id));
    }

    @DeleteMapping("/projects/{project_id}/tasks/{task_id}")
    public ResponseEntity<Void> deleteTask(
           @PathVariable Long task_id
    ){
        taskService.deleteTask(task_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
