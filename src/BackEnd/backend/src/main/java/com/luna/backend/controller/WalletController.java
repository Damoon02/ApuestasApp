package com.luna.backend.controller;

import com.luna.backend.dto.AmountRequest;
import com.luna.backend.dto.WalletSummaryResponse;
import com.luna.backend.service.WalletService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wallet")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping
    public WalletSummaryResponse wallet(Authentication auth) {
        return walletService.getWallet(auth.getName());
    }

    @PostMapping("/deposit")
    public WalletSummaryResponse deposit(Authentication auth, @Valid @RequestBody AmountRequest req) {
        return walletService.deposit(auth.getName(), req.amount());
    }

    @PostMapping("/withdraw")
    public WalletSummaryResponse withdraw(Authentication auth, @Valid @RequestBody AmountRequest req) {
        return walletService.withdraw(auth.getName(), req.amount());
    }
}