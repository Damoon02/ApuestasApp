package com.luna.backend.service;

import com.luna.backend.dto.BetResponse;
import com.luna.backend.dto.CreateBetRequest;
import com.luna.backend.model.BetEntity;
import com.luna.backend.model.UserEntity;
import com.luna.backend.model.WalletTransactionEntity;
import com.luna.backend.repository.BetRepository;
import com.luna.backend.repository.UserRepository;
import com.luna.backend.repository.WalletTransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

import java.time.LocalDateTime;

@Service
public class BetService {

    private final UserRepository userRepository;
    private final BetRepository betRepository;
    private final WalletTransactionRepository walletRepo;

    public BetService(UserRepository userRepository, BetRepository betRepository, WalletTransactionRepository walletRepo) {
        this.userRepository = userRepository;
        this.betRepository = betRepository;
        this.walletRepo = walletRepo;
    }

    public BetResponse create(String email, CreateBetRequest req) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

        BigDecimal balance = walletRepo.balanceOf(user.getId());
        if (balance.compareTo(req.stake()) < 0) {
            throw new IllegalArgumentException("Saldo insuficiente para apostar.");
        }

        BigDecimal payout = req.stake().multiply(req.odds()).setScale(2, RoundingMode.HALF_UP);

        BetEntity bet = betRepository.save(BetEntity.builder()
                .user(user)
                .stake(req.stake())
                .odds(req.odds())
                .potentialPayout(payout)
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build());

        // resta saldo registrando transacción negativa
        walletRepo.save(WalletTransactionEntity.builder()
                .user(user)
                .amount(req.stake().negate())
                .type("BET")
                .createdAt(LocalDateTime.now())
                .build());

        return new BetResponse(bet.getId(), bet.getStake(), bet.getOdds(), bet.getPotentialPayout(), bet.getStatus(), bet.getCreatedAt());
    }

    public List<BetResponse> list(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

        return betRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(b -> new BetResponse(b.getId(), b.getStake(), b.getOdds(), b.getPotentialPayout(), b.getStatus(), b.getCreatedAt()))
                .toList();
    }

    public BetResponse settle(Long betId, String resultRaw) {
    String result = resultRaw.trim().toUpperCase();
    if (!result.equals("WON") && !result.equals("LOST")) {
        throw new IllegalArgumentException("result debe ser WON o LOST");
    }

    var bet = betRepository.findById(betId)
            .orElseThrow(() -> new IllegalArgumentException("Apuesta no encontrada."));

    if (!"PENDING".equals(bet.getStatus())) {
        throw new IllegalArgumentException("La apuesta ya fue liquidada.");
    }

    bet.setStatus(result);

    if (result.equals("WON")) {
        walletRepo.save(WalletTransactionEntity.builder()
                .user(bet.getUser())
                .amount(bet.getPotentialPayout())
                .type("PAYOUT")
                .createdAt(LocalDateTime.now())
                .build());
    }

    var saved = betRepository.save(bet);

    return new BetResponse(
            saved.getId(),
            saved.getStake(),
            saved.getOdds(),
            saved.getPotentialPayout(),
            saved.getStatus(),
            saved.getCreatedAt()
    );
}
}