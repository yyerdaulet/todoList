package com.example.demo.jira.user;

import com.example.demo.jira.JwtCore;
import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.user.Dto.UserCreateRequest;
import com.example.demo.jira.user.Dto.UserLoginRequest;
import com.example.demo.jira.user.Dto.UserLoginResponse;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository repository;
    private PasswordEncoder encoder;
    private AuthenticationManager manager;
    private JwtCore jwtCore;

    @LogExecutionTime
    public void registration( UserCreateRequest request) {
        if(repository.existsByEmail(request.email())){
            throw new EntityExistsException();
        }
        String hashedCode = encoder.encode(request.password());
        UserEntity user = new UserEntity(
                null,
                request.name(),
                request.email(),
                hashedCode,
                request.role()
        );
        repository.save(user);
    }

    @LogExecutionTime
    public UserLoginResponse login(UserLoginRequest request) {
        Authentication  authentication = manager
                .authenticate(new UsernamePasswordAuthenticationToken(request.email(),request.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new UserLoginResponse(
                    jwtCore.generateToken(authentication)
            );

    }
}
