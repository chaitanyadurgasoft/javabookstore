package com.example.bookservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// This interface handles all database operations for books
// Spring Boot automatically creates the implementation for us!
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    // JpaRepository gives us these methods for free:
    // - save(book) - saves a book to database
    // - findAll() - gets all books from database
    // - findById(id) - finds a book by its ID
    // - deleteById(id) - deletes a book by its ID
    
    // We can add custom methods if needed, but for our simple app,
    // the basic methods are enough!
}
