package com.luna.backend.service;

import com.luna.backend.dto.AuthResponse;
import com.luna.backend.dto.LoginRequest;
import com.luna.backend.dto.LoginResponse;
import com.luna.backend.dto.RegisterRequest;
import com.luna.backend.model.UserEntity;
import com.luna.backend.repository.UserRepository;
import com.luna.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest req) {
        String email = req.email().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("El email ya está registrado.");
        }

        UserEntity user = UserEntity.builder()
                .email(email)
                .passwordHash(passwordEncoder.encode(req.password()))
                .role("USER")
                .build();

        UserEntity saved = userRepository.save(user);
        return new AuthResponse(saved.getId(), saved.getEmail(), saved.getRole());
    }

    // ✅ CAMBIO: ahora login regresa token
    public LoginResponse login(LoginRequest req) {
        String email = req.email().trim().toLowerCase();

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas."));

        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Credenciales inválidas.");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole());
        return new LoginResponse(user.getId(), user.getEmail(), user.getRole(), token);
    }
}