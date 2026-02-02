package com.example.demo.jira.comment;

import com.example.demo.jira.comment.dto.CommentRequest;
import com.example.demo.jira.comment.dto.CommentResponse;
import com.example.demo.jira.task.TaskRepository;
import com.example.demo.jira.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository repository;
    private final CommentMapper mapper;
    private final TaskRepository taskRepository;

    public List<CommentResponse> getAllComments() {
        return repository.
                findAll().
                stream().
                map(mapper::toDomain).toList();
    }


    public CommentResponse getCommentById(
            Long id
    ) {
        var comment = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Comment not found")
        );
        return mapper.toDomain(comment);
    }

    public CommentResponse createComment(Long task_id,CommentRequest request) {
        var task = taskRepository.findById(task_id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Comment not found")
                );
        var comment = new CommentEntity(
                null,
                request.text(),
                task
        );
        repository.save(comment);
        return mapper.toDomain(comment);
    }

    public CommentResponse updateComment(Long id, CommentRequest request) {
        var comment = repository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Comment not found")
                );
        comment.setText(request.text());
        repository.save(comment);
        return mapper.toDomain(comment);
    }


    public void deleteComment(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Comment not found");
        }

        repository.deleteById(id);
    }
}
