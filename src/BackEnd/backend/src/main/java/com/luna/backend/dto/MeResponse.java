package com.luna.backend.dto;

public record MeResponse(
        Long id,
        String email,
        String role
) {}