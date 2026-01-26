package com.example.demo.jira.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity,Long> {

    @Query(
            """
    select t from TaskEntity t
        where t.status = :status
        order by t.startTime
    """
    )
    List<TaskEntity> getCompleted(
            @Param("status") Status status
    );


    @Query("""
    select t from TaskEntity t
    where t.status != :status
    order by t.startTime
""")
    List<TaskEntity> findActiveTasks(
            @Param("status") Status status
    );
}
