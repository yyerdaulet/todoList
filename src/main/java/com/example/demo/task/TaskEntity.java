package com.example.demo.task;


import jakarta.persistence.*;

import java.time.LocalDate;

@Table(name="Tasks")
@Entity
public class TaskEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="text")
    private String text;

    @Column(name="start_Time")
    private LocalDate startTime;

    @Column(name="end_Time")
    private LocalDate endTime;

    @Enumerated(EnumType.STRING)
    @Column(name="state")
    private State state;

    public TaskEntity() {
    }

    public TaskEntity(Long id, String text, LocalDate startTime, LocalDate endTime, State state) {
        this.id = id;
        this.text = text;
        this.startTime = startTime;
        this.endTime = endTime;
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public LocalDate getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDate endTime) {
        this.endTime = endTime;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}
