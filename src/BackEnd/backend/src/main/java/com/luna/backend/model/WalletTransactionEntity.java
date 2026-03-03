package com.luna.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallet_transactions")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WalletTransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación a usuario
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount; // + depósito, - retiro, - apuesta, + pago

    @Column(nullable = false, length = 20)
    private String type; // DEPOSIT, WITHDRAW, BET, PAYOUT

    @Column(nullable = false)
    private LocalDateTime createdAt;
}