package com.example.demo.jira.groupChat.chat.repository;

import com.example.demo.jira.groupChat.chat.entity.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<ChatEntity,Long> {
}
