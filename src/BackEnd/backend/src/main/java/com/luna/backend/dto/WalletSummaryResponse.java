package com.luna.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record WalletSummaryResponse(
        BigDecimal balance,
        List<WalletMovement> lastMovements
) {
    public record WalletMovement(
            Long id,
            BigDecimal amount,
            String type,
            LocalDateTime createdAt
    ) {}
}