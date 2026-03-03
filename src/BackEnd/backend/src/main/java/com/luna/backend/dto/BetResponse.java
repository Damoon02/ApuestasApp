package com.luna.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BetResponse(
        Long id,
        BigDecimal stake,
        BigDecimal odds,
        BigDecimal potentialPayout,
        String status,
        LocalDateTime createdAt
) {}