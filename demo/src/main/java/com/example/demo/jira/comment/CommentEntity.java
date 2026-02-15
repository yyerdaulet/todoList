package com.example.demo.jira.comment;

import com.example.demo.jira.task.TaskEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="Comments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CommentEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;

    @Column(name="text")
    @NotNull
    String text;

    @NotNull
    @JsonBackReference
    @ManyToOne()
    TaskEntity task;


}
