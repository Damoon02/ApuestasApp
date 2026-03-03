package com.luna.backend.dto;

public record AuthResponse(
        Long id,
        String email,
        String role
) {}