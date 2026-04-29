package com.example.demo.jira.groupChat.chat.entity;

import com.example.demo.jira.groupChat.messages.entity.MessageEntity;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="group_chat")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title",length = 30)
    private String title;

    @Column(name = "about")
    private String about;

    @ManyToMany
    private List<ProfileEntity> members;

    @OneToMany
    private List<MessageEntity> messages;
}
