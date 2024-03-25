package com.hhcb.procesacontable.router.test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class Ping {
    @GetMapping("/ping")
    public ResponseEntity<String> get() {
        return ResponseEntity.ok("Pong");
    }
}
