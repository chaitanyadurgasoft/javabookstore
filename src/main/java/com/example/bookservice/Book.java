package com.example.bookservice;

import jakarta.persistence.*;

// This tells Java that Book is a database table
@Entity
@Table(name = "books")
public class Book {
    
    // This is the unique ID for each book (auto-generated)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Book title (cannot be empty)
    @Column(nullable = false)
    private String title;
    
    // Book author (cannot be empty)
    @Column(nullable = false)
    private String author;
    
    // Default constructor (required by Java)
    public Book() {}
    
    // Constructor to create a new book
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }
    
    // Getter methods (to read the values)
    public Long getId() {
        return id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public String getAuthor() {
        return author;
    }
    
    // Setter methods (to change the values)
    public void setId(Long id) {
        this.id = id;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public void setAuthor(String author) {
        this.author = author;
    }
}
