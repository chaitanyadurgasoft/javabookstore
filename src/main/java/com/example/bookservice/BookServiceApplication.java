package com.example.bookservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// This is the main class that starts your entire application
@SpringBootApplication
public class BookServiceApplication {
    
    public static void main(String[] args) {
        // This line starts the Spring Boot application
        SpringApplication.run(BookServiceApplication.class, args);
        System.out.println("🚀 Book Service is running!");
        System.out.println("📚 You can now add and view books!");
    }
}
