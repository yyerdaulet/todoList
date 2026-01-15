package com.example.demo.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity,Long> {

    @Query(
            """
    select t from TaskEntity t
        where t.state = :state
        order by t.startTime
    """
    )
    List<TaskEntity> getCompleted(
            @Param("state") State state
    );


    @Query("""
    select t from TaskEntity t
    where t.state != :state
    order by t.startTime
""")
    List<TaskEntity> findActiveTasks(
            @Param("state") State state
    );
}
