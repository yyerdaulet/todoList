package com.example.demo.jira.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity,Long> {
    @Query("select c from CommentEntity c where c.task.id = :task_id")
    List<CommentEntity> findByTaskId(@Param("task_id") Long task_id);
}
