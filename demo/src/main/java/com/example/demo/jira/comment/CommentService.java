package com.example.demo.jira.comment;

import com.example.demo.jira.comment.dto.CommentRequest;
import com.example.demo.jira.comment.dto.CommentResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class CommentService {
    private final CommentRepository repository;
    private final CommentMapper mapper;

    public CommentService(CommentRepository repository, CommentMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

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
                () -> new EntityNotFoundException("Item not found")
        );
        return mapper.toDomain(comment);
    }

    public CommentResponse createComment(CommentRequest request) {
        var comment = new CommentEntity(
                null,
                request.text(),
                request.author()
        );
        repository.save(comment);
        return mapper.toDomain(comment);
    }

    public CommentResponse updateComment(Long id, CommentRequest request) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Item not found");
        }
        var comment = new CommentEntity(
                id,
                request.text(),
                request.author()
        );
        repository.save(comment);
        return mapper.toDomain(comment);
    }


    public void deleteComment(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Item not found");
        }

        repository.deleteById(id);
    }
}
