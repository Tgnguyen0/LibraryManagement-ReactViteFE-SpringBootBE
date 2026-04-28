package org.example.app.controllers;

import org.example.app.config.JWTUtil;
import org.example.app.models.User;
import org.example.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        System.out.println("Login attempt: " + username);

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("Login FAILED");
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Sai tên đăng nhập hoặc mật khẩu"));
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        System.out.println("Login OK - token: " + token);

        return ResponseEntity.ok(Map.of(
                "token",    token,
                "role",     user.getRole(),
                "username", user.getUsername()
        ));
    }
}