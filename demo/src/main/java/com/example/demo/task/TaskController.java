package com.example.demo.task;

import com.example.demo.task.Dto.TaskRequest;
import com.example.demo.task.Dto.TaskResponse;
import com.example.demo.task.log.LogExecutionTime;
import com.example.demo.task.page.Page;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.util.List;


@RestController
@RequestMapping("/tasks")
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
            @RequestParam("pageSize") Integer pageSize,
            @RequestParam("pageNumber") Integer pageNumber
    ){
        var page = new Page(
                pageSize,
                pageNumber);
        return ResponseEntity.ok().body(taskService.getAllTasks(page));
    }

    @LogExecutionTime
    @GetMapping("/active")
    public ResponseEntity<List<TaskResponse>> getActiveTasks(){
        return ResponseEntity.ok().body(taskService.getActiveTasks());
    }

    @LogExecutionTime
    @GetMapping("/completed")
    public ResponseEntity<List<TaskResponse>> getAllCompletedTasks(){
        return ResponseEntity.ok().body(taskService.getAllCompletedTasks());
    }

    @LogExecutionTime
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @RequestBody @Valid TaskRequest taskToCreate
    ){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                taskService.createTask(taskToCreate)
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
    @PatchMapping("/{id}/complete")
    public ResponseEntity<TaskResponse> completeTask(
            @PathVariable Long id
    ){
           return ResponseEntity.status(HttpStatus.OK).body(taskService.completeTask(id));
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
