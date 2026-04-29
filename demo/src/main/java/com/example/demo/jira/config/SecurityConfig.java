package com.example.demo.jira.config;

import com.example.demo.jira.authentication.details.TokenFilter;
import com.example.demo.jira.authentication.enums.UserRole;
import com.example.demo.jira.authentication.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final UserRepository userRepository;

    private TokenFilter tokenFilter;
      @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> {})
                .headers((headers) -> headers.frameOptions(
                        (frameOptions) -> frameOptions.sameOrigin()
                ))
                .sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/","/login","/register/**","/error","/verify").permitAll()
                                .requestMatchers("/ws-chat/**", "/ws/**").permitAll()
                                .requestMatchers("/profiles/*/photo/**").hasRole(UserRole.USER.name())
                                .requestMatchers("/users/**").hasRole(UserRole.ADMIN.name())
                                .anyRequest().authenticated()
                            )
                .addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class)
                        .build();
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config){
        return config.getAuthenticationManager();
    }
}
