package com.example.demo.jira.groupChat.messages.entity;

import com.example.demo.jira.groupChat.chat.entity.ChatEntity;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name="group_message")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ChatEntity chat;

    @ManyToOne
    private ProfileEntity profile;

    @Column(name="content",nullable = false,length=4000)
    private String content;

    @Column(name="crated_at",nullable = false)
    private Instant createdAt;
}
