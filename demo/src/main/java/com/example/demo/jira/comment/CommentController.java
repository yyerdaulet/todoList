package com.example.demo.jira.comment;

import com.example.demo.jira.comment.dto.CommentRequest;
import com.example.demo.jira.comment.dto.CommentResponse;
import com.example.demo.jira.log.LogExecutionTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("users/{user_id}/projects/{project_id}/tasks/{task_id}/comments")
@RestController
public class CommentController {
    private final CommentService service;

    public CommentController(CommentService service) {
        this.service = service;
    }

    @GetMapping()
    @LogExecutionTime()
    public ResponseEntity<List<CommentResponse>> getAllComments(
            @PathVariable("task_id") Long task_id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.getAllComments(task_id));
    }

    @GetMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<CommentResponse> getCommentById(
            @PathVariable Long id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.getCommentById(id));
    }

    @PostMapping()
    @LogExecutionTime()
    public ResponseEntity<CommentResponse> createComment(
            @RequestBody CommentRequest request,
            @PathVariable("task_id") Long task_id
            ){
        return ResponseEntity.status(HttpStatus.OK).body(service.createComment(task_id,request));
    }

    @PutMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<CommentResponse> updateComment(
            @PathVariable Long id,
            @RequestBody CommentRequest request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.updateComment(id,request));
    }

    @LogExecutionTime
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long id
    ){
        service.deleteComment(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
