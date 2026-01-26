package com.example.demo.jira.comment;

import com.example.demo.jira.comment.dto.CommentRequest;
import com.example.demo.jira.comment.dto.CommentResponse;
import com.example.demo.jira.project.dto.ProjectResponse;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    public CommentResponse toDomain(CommentEntity commentEntity) {
        return new CommentResponse(
                null,
                commentEntity.getText(),
                commentEntity.getAuthor()
        );
    }

    public CommentEntity toEntity(Long id, CommentRequest request){
        return new CommentEntity(
                id,
                request.text(),
                request.author()
        );
    }

}
