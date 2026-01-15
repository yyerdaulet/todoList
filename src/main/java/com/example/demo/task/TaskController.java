package com.example.demo.task;

import com.example.demo.task.Dto.TaskRequest;
import com.example.demo.task.Dto.TaskResponse;
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
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable("id") Long id
    ){
        log.info("Send task by id:{}",id);
        return ResponseEntity
                .ok()
                .body(taskService.getTaskById(id));
    }

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

    @GetMapping("/active")
    public ResponseEntity<List<TaskResponse>> getActiveTasks(){
        return ResponseEntity.ok().body(taskService.getActiveTasks());
    }

    @GetMapping("/completed")
    public ResponseEntity<List<TaskResponse>> getAllCompletedTasks(){
        return ResponseEntity.ok().body(taskService.getAllCompletedTasks());
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @RequestBody @Valid TaskRequest taskToCreate
    ){
        log.info("created task");
        return ResponseEntity.status(HttpStatus.CREATED).body(
                taskService.createTask(taskToCreate)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @RequestBody @Valid TaskRequest taskToUpdate,
            @PathVariable Long id
    ){
        log.info("updated task with id:{}",id);
        return ResponseEntity.ok().body(taskService.updateTask(id,taskToUpdate));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<TaskResponse> completeTask(
            @PathVariable Long id
    ){
            log.info("completed Task with id:{}",id);
           return ResponseEntity.status(HttpStatus.OK).body(taskService.completeTask(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id
    ){
        log.info("deleted Task with id:{}",id);
        taskService.deleteTask(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
