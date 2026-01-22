package com.example.demo.task;

import com.example.demo.task.Dto.TaskRequest;
import com.example.demo.task.Dto.TaskResponse;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {
    public TaskResponse toDomain(TaskEntity task){
        return new TaskResponse(
                task.getId(),
                task.getText(),
                task.getStartTime(),
                task.getEndTime(),
                task.getState()
        );
    }

    public TaskEntity toEntity(TaskResponse task){
        return new TaskEntity(
                task.id(),
                task.text(),
                task.startTime(),
                task.deadLine(),
                task.state()
        );
    }

    public TaskEntity toEntity(Long id, TaskRequest task){
        return new TaskEntity(
                id,
                task.text(),
                task.startTime(),
                task.deadLine(),
                State.CHANGED
        );
    }

}
