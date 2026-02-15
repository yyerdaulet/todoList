package com.example.demo.jira;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Logger;

@Component
@AllArgsConstructor
public class TokenFilter extends OncePerRequestFilter {
    private JwtCore jwtCore;
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = null;
        String username = null;
        UserDetails userDetails = null;
        UsernamePasswordAuthenticationToken auth = null;
        try{
            String headerAuth = request.getHeader("Authorization");
            if(headerAuth != null && headerAuth.startsWith("Bearer ")){
                jwt = headerAuth.substring(7);
            }
            if(jwt != null){
                try{
                    username = jwtCore.getName(jwt);
                }catch (ExpiredJwtException e){
                    System.out.println("Token expired");
                }

                if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
                    userDetails = userDetailsService.loadUserByUsername(username);
                    auth = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

            }

        } catch (Exception e) {
            System.out.println(e);
        }

        filterChain.doFilter(request,response);
    }
}
