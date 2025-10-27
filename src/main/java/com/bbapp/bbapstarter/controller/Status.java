package com.bbapp.bbapstarter.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class Status {

    @RequestMapping("/status")
    public ResponseEntity<?> status() {
        String time = LocalDateTime.now()
            .atZone(ZoneId.of("UTC-5"))
            .format(DateTimeFormatter.ofPattern("dd-MM-YYYY HH:mm:ss"));
        return ResponseEntity.ok(Map.of(
            "status", "Greetings from SpringBoot the time is " + time  
        ));
    }
}
