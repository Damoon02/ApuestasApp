package com.luna.backend.service;

import com.luna.backend.dto.WalletSummaryResponse;
import com.luna.backend.model.UserEntity;
import com.luna.backend.model.WalletTransactionEntity;
import com.luna.backend.repository.UserRepository;
import com.luna.backend.repository.WalletTransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class WalletService {

    private final UserRepository userRepository;
    private final WalletTransactionRepository walletRepo;

    public WalletService(UserRepository userRepository, WalletTransactionRepository walletRepo) {
        this.userRepository = userRepository;
        this.walletRepo = walletRepo;
    }

    public WalletSummaryResponse getWallet(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

        BigDecimal balance = walletRepo.balanceOf(user.getId());
        var last = walletRepo.findTop20ByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(t -> new WalletSummaryResponse.WalletMovement(
                        t.getId(), t.getAmount(), t.getType(), t.getCreatedAt()
                ))
                .toList();

        return new WalletSummaryResponse(balance, last);
    }

    public WalletSummaryResponse deposit(String email, BigDecimal amount) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

        walletRepo.save(WalletTransactionEntity.builder()
                .user(user)
                .amount(amount)
                .type("DEPOSIT")
                .createdAt(LocalDateTime.now())
                .build());

        return getWallet(email);
    }

    public WalletSummaryResponse withdraw(String email, BigDecimal amount) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

        BigDecimal balance = walletRepo.balanceOf(user.getId());
        if (balance.compareTo(amount) < 0) {
            throw new IllegalArgumentException("Saldo insuficiente.");
        }

        walletRepo.save(WalletTransactionEntity.builder()
                .user(user)
                .amount(amount.negate())
                .type("WITHDRAW")
                .createdAt(LocalDateTime.now())
                .build());

        return getWallet(email);
    }
}