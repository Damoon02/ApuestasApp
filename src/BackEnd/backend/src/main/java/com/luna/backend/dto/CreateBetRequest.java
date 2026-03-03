package com.luna.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateBetRequest(
        @NotNull @DecimalMin("0.01") BigDecimal stake,
        @NotNull @DecimalMin("1.01") BigDecimal odds
) {}