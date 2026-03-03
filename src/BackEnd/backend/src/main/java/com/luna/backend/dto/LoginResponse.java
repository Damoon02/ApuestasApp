package com.luna.backend.dto;

public record LoginResponse(
        Long id,
        String email,
        String role,
        String token
) {}