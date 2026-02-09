package com.example.demo.jira.comment;

import com.example.demo.jira.comment.dto.CommentRequest;
import com.example.demo.jira.comment.dto.CommentResponse;
import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.task.TaskRepository;
import com.example.demo.jira.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository repository;
    private final CommentMapper mapper;
    private final TaskRepository taskRepository;

    @LogExecutionTime
    public List<CommentResponse> getAllComments(
             Long task_id
    ) {
        return repository.
                findByTaskId(task_id).
                stream().
                map(mapper::toDomain).toList();
    }

    @LogExecutionTime
    public CommentResponse getCommentById(
            Long id
    ) {
        var comment = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Comment not found")
        );
        return mapper.toDomain(comment);
    }

    @Transactional
    @LogExecutionTime
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

    @Transactional
    @LogExecutionTime
    public CommentResponse updateComment(Long id, CommentRequest request) {
        var comment = repository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Comment not found")
                );
        comment.setText(request.text());
        repository.save(comment);
        return mapper.toDomain(comment);
    }

    @Transactional
    @LogExecutionTime
    public void deleteComment(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Comment not found");
        }

        repository.deleteById(id);
    }
}
