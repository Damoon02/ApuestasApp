package com.luna.backend.controller;

import com.luna.backend.dto.MeResponse;
import com.luna.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public MeResponse me(Authentication auth) {
        return userService.me(auth.getName()); // auth.getName() = email del token
    }
}