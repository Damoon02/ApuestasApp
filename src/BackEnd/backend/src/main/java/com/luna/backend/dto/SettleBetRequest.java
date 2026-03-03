package com.luna.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record SettleBetRequest(
        @NotBlank String result // "WON" o "LOST"
) {}