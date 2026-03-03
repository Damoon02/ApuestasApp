package com.luna.backend.service;

import com.luna.backend.dto.MeResponse;
import com.luna.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public MeResponse me(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
        return new MeResponse(user.getId(), user.getEmail(), user.getRole());
    }
}