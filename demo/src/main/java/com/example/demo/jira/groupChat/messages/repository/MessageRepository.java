package com.example.demo.jira.groupChat.messages.repository;

import com.example.demo.jira.groupChat.messages.entity.MessageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity,Long> {
    Page<MessageEntity>  findByChatIdOrderByCreatedAtDesc(Long chatId, Pageable pageable);
}
