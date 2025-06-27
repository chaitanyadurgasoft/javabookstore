package com.example.bookservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// This class handles web requests (REST API)
@RestController
@RequestMapping("/books")  // All endpoints start with /books
@CrossOrigin(origins = "*") // Allow requests from any origin (for development)
public class BookController {
    
    // This connects our controller to the database operations
    @Autowired
    private BookRepository bookRepository;
    
    // GET /books - Returns all books
    @GetMapping
    public List<Book> getAllBooks() {
        System.out.println("📚 Getting all books...");
        List<Book> books = bookRepository.findAll();
        System.out.println("Found " + books.size() + " books");
        return books;
    }
    
    // POST /books - Adds a new book
    // Example: {"title": "Java for Beginners", "author": "John Doe"}
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        System.out.println("📝 Adding new book: " + book.getTitle() + " by " + book.getAuthor());
        Book savedBook = bookRepository.save(book);
        System.out.println("✅ Book saved with ID: " + savedBook.getId());
        return savedBook;
    }
    
    // GET /books/{id} - Gets a specific book by ID
    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        System.out.println("🔍 Looking for book with ID: " + id);
        return bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }
    
    // DELETE /books/{id} - Deletes a book by ID
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        System.out.println("🗑️ Deleting book with ID: " + id);
        bookRepository.deleteById(id);
        System.out.println("✅ Book deleted successfully!");
        return "Book deleted successfully!";
    }
}
