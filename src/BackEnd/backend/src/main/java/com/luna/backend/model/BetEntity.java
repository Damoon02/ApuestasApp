package com.luna.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bets")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal stake; // monto apostado

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal odds; // cuota total (ej 1.85)

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal potentialPayout; // stake * odds

    @Column(nullable = false, length = 20)
    private String status; // PENDING, WON, LOST

    @Column(nullable = false)
    private LocalDateTime createdAt;
}