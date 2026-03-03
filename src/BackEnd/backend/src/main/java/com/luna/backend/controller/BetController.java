package com.luna.backend.controller;

import com.luna.backend.dto.BetResponse;
import com.luna.backend.dto.CreateBetRequest;
import com.luna.backend.service.BetService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bets")
public class BetController {

    private final BetService betService;

    public BetController(BetService betService) {
        this.betService = betService;
    }

    @PostMapping
    public BetResponse create(Authentication auth, @Valid @RequestBody CreateBetRequest req) {
        return betService.create(auth.getName(), req);
    }

    @GetMapping
    public List<BetResponse> list(Authentication auth) {
        return betService.list(auth.getName());
    }
}