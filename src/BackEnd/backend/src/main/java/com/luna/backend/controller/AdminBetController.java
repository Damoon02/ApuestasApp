package com.luna.backend.controller;

import com.luna.backend.dto.BetResponse;
import com.luna.backend.dto.SettleBetRequest;
import com.luna.backend.service.BetService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/bets")
public class AdminBetController {

    private final BetService betService;

    public AdminBetController(BetService betService) {
        this.betService = betService;
    }

    @PostMapping("/{id}/settle")
    public BetResponse settle(@PathVariable Long id, @Valid @RequestBody SettleBetRequest req) {
        return betService.settle(id, req.result());
    }
}