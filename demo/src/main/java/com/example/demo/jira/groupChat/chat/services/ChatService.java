package com.example.demo.jira.groupChat.chat.services;

import com.example.demo.jira.authentication.entity.UserEntity;
import com.example.demo.jira.authentication.repository.UserRepository;
import com.example.demo.jira.groupChat.chat.repository.ChatRepository;
import com.example.demo.jira.groupChat.chat.dto.ChatRequest;
import com.example.demo.jira.groupChat.chat.dto.ChatResponse;
import com.example.demo.jira.groupChat.chat.entity.ChatEntity;
import com.example.demo.jira.groupChat.chat.mapper.ChatMapper;
import com.example.demo.jira.items.profile.dto.ProfileResponse;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.profile.repo.ProfileRepository;
import com.example.demo.jira.items.profile.utils.ProfileUtils;
import com.example.demo.jira.log.LogExecutionTime;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ProfileRepository profileRepository;
    private final ChatRepository chatRepository;
    private final ChatMapper chatMapper;
    private final UserRepository userRepository;
    private final static Logger log = LoggerFactory.getLogger(ChatService.class);

    @Transactional
    public ChatResponse createGroupChat(String email,ChatRequest request) {
        Long profileId = fetchProfileId(email);

        ChatEntity chat = buildChat(profileId,request);

        ChatEntity savedChat = chatRepository.save(chat);

        return chatMapper.toDomain(savedChat);
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

    private ChatEntity buildChat(Long profileId,ChatRequest request){
        ChatEntity chat = chatMapper.toCreateEntity(request);

        ProfileEntity profile = findProfileById(profileId);

        List<ProfileEntity> profiles = resolveMembers(request.members());

        profiles.add(profile);

        chat.setMembers(profiles);

        return chat;
    }

    private ProfileEntity findProfileById(Long profileId){
        return profileRepository.findById(profileId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Profile Not Found : " + profileId)
                );
    }


    @LogExecutionTime
    public ChatResponse getGroupChat(Long chatId) {
        log.info("Backend send chat with id : {}", findChatById(chatId).getId());
        return chatMapper.toDomain(findChatById(chatId));
    }

    private ChatEntity findChatById(Long chatId){
        return chatRepository.findById(chatId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Chat not found : " + chatId)
                );
    }

    public ChatResponse addMembers(Long chatId,List<ProfileResponse> profiles) {
        ChatEntity chat = findChatById(chatId);

        List<ProfileEntity> profilesToAdd = resolveMembers(profiles);

        List<ProfileEntity> members = chat.getMembers();

        members.addAll(profilesToAdd);

        chat.setMembers(members);

        ChatEntity savedChat = chatRepository.save(chat);

        return chatMapper.toDomain(savedChat);
    }

    private List<ProfileEntity> resolveMembers(List<ProfileResponse> profiles){
        List<String> orcidList = ProfileUtils.fetchListORCID(profiles);

        return profileRepository.findAllByOrcidIn(orcidList);
    }

    public List<ChatResponse> getChats() {
        return chatRepository.findAll()
                .stream()
                .map(chatMapper::toDomain)
                .toList();
    }
}

