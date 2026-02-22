package com.example.demo.jira.comment;

import com.example.demo.jira.comment.dto.CommentResponse;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    public CommentResponse toDomain(CommentEntity commentEntity) {
        return new CommentResponse(
                commentEntity.getId(),
                commentEntity.getText(),
                commentEntity.getTask().getTitle()
        );
    }


}
