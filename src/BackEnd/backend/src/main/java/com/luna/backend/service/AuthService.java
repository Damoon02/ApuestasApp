package com.luna.backend.service;

import com.luna.backend.dto.AuthResponse;
import com.luna.backend.dto.RegisterRequest;
import com.luna.backend.model.UserEntity;
import com.luna.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("El email ya está registrado.");
        }

        UserEntity user = UserEntity.builder()
                .email(req.email().trim().toLowerCase())
                .passwordHash(passwordEncoder.encode(req.password()))
                .role("USER")
                .build();

        UserEntity saved = userRepository.save(user);

        return new AuthResponse(saved.getId(), saved.getEmail(), saved.getRole());
    }
}