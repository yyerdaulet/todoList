package com.example.demo.jira.groupChat.messages.services;

import com.example.demo.jira.authentication.entity.UserEntity;
import com.example.demo.jira.authentication.repository.UserRepository;
import com.example.demo.jira.groupChat.messages.dto.MessageRequest;
import com.example.demo.jira.groupChat.messages.dto.MessageResponse;
import com.example.demo.jira.groupChat.chat.entity.ChatEntity;
import com.example.demo.jira.groupChat.messages.entity.MessageEntity;
import com.example.demo.jira.groupChat.messages.mapper.MessageMapper;
import com.example.demo.jira.groupChat.chat.repository.ChatRepository;
import com.example.demo.jira.groupChat.messages.repository.MessageRepository;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.profile.repo.ProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageMapper messageMapper;
    private final ProfileRepository profileRepository;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public Page<MessageResponse> getMessages(Long chatId, int page, int size){
        Pageable pageable = PageRequest.of(page,size);
        return messageRepository.findByChatIdOrderByCreatedAtDesc(chatId,pageable)
                .map(messageMapper::toDomain);
    }

    public MessageResponse createAndSendMessage(MessageRequest request, String email, Long chatId){
        Long profileId = fetchProfileId(email);
        MessageEntity message = buildMessage(request,profileId,chatId);
        MessageEntity savedMessage = messageRepository.save(message);
        return messageMapper.toDomain(savedMessage);
    }

    private Long fetchProfileId(String email){
        UserEntity user = findUserByEmail(email);
        return user.getId();
    }


    private UserEntity findUserByEmail(String email){
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "User Not Found : " + email
                        )
                );
    }



    private MessageEntity buildMessage(MessageRequest request, Long profileId, Long chatId){
        MessageEntity message = messageMapper.toEntity(request);

        ChatEntity chat = findChatById(chatId);

        ProfileEntity profile = findProfileById(profileId);

        message.setProfile(profile);
        message.setChat(chat);

        return message;
    }

    private ChatEntity findChatById(Long chatId){
        return chatRepository.findById(chatId)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Chat Not Found : " + chatId
                        )
                );
    }

    private ProfileEntity findProfileById(Long profileId){
        return profileRepository.findById(profileId)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Profile Not Found : " + profileId
                        )
                );
    }



    private void validate(MessageRequest request){
        if(request.content() == null || request.content().trim().isEmpty()){
            throw new IllegalArgumentException("Content is required");
        }
        if(request.content().length() > 4000){
            throw new IllegalArgumentException("Content length is longer than 4000 char");
        }
    }


}
