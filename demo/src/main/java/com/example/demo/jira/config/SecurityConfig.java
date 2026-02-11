package com.example.demo.jira.config;

import com.example.demo.jira.user.UserRepository;
import com.example.demo.jira.user.UserRole;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collections;
import java.util.Set;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final UserRepository userRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/","/login","/registration","/error").permitAll()
                                .requestMatchers("/users/**").hasRole(UserRole.MANAGER.name())
                                .requestMatchers("/users/**").hasRole(UserRole.ASSIGNEE.name())
                                .anyRequest().authenticated()
                            ).formLogin(
                                    form -> form.loginPage("/login").permitAll()
                                            .usernameParameter("email")
                                            .defaultSuccessUrl("/users")
                ).logout(logout -> logout.logoutUrl("/logout").permitAll())
                        .build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(){

        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
                var user = userRepository.findByEmailIgnoreCase(username).orElseThrow(
                        () -> new EntityNotFoundException("User not found")
                );
                Set<SimpleGrantedAuthority> roles = Collections.singleton(user.getRole().toAuthority());
                return new User(user.getEmail(),user.getPassword(),roles);
            }
        };
    }
}
