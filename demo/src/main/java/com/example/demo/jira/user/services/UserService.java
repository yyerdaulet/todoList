package com.example.demo.jira.user.services;

import com.example.demo.jira.JwtCore;
import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.profile.repo.ProfileRepository;
import com.example.demo.jira.user.Dto.TokenDto;
import com.example.demo.jira.user.Dto.UserCreateRequest;
import com.example.demo.jira.user.Dto.UserLoginRequest;
import com.example.demo.jira.user.Dto.UserLoginResponse;
import com.example.demo.jira.user.UserEntity;
import com.example.demo.jira.user.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.xml.bind.ValidationException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository repository;
    private ProfileRepository profileRepository;
    private PasswordEncoder encoder;
    private AuthenticationManager manager;
    private JwtCore jwtCore;
    private EmailService eService;

    public  String verifyEmail(String token) {
        UserEntity user = repository.findByVerificationToken(token).orElseThrow(
                () -> new RuntimeException("Invalid token")
        );

        user.setEnabled(true);
        user.setVerificationToken(null);

        repository.save(user);

        return "email verified successfully!";
    }

    @LogExecutionTime
    public TokenDto registration( UserCreateRequest request) {
        if(repository.existsByEmail(request.email())){
            throw new EntityExistsException();
        }

        String token = UUID.randomUUID().toString();
        try {
            eService.sendVerificationEmail(request.email(), token);
        }catch(Exception e){
            throw e ;
        }

        String hashedCode = encoder.encode(request.password());
        UserEntity user = new UserEntity(
                null,
                request.email(),
                hashedCode,
                request.role(),
                null,
                false,
                token
        );
        repository.save(user);



        return new TokenDto(
            token
        );
    }



    @LogExecutionTime
    public UserLoginResponse login(UserLoginRequest request) {
        Authentication  authentication = manager
                .authenticate(new UsernamePasswordAuthenticationToken(request.email(),request.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserEntity user = repository.findByEmailIgnoreCase(request.email()).orElseThrow(
                () -> new EntityNotFoundException("User with such email not found")
        );

        if(!user.getEnabled()){
            throw new UsernameNotFoundException(
                    "Not verified yet"
            );
        }

        return new UserLoginResponse(
                    user.getId(),
                    jwtCore.generateToken(authentication)
            );

    }

    public Boolean check(Long userId) {
        return profileRepository.existsById(userId);
    }
}
