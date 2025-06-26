package com.example.bookservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// This class handles web requests (REST API)
@RestController
@RequestMapping("/books")  // All endpoints start with /books
public class BookController {
    
    // This connects our controller to the database operations
    @Autowired
    private BookRepository bookRepository;
    
    // GET /books - Returns all books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    // POST /books - Adds a new book
    // Example: {"title": "Java for Beginners", "author": "John Doe"}
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }
    
    // GET /books/{id} - Gets a specific book by ID
    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }
    
    // DELETE /books/{id} - Deletes a book by ID
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
        return "Book deleted successfully!";
    }
}
