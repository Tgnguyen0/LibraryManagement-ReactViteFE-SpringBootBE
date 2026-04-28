package org.example.app.controllers;

import jakarta.validation.Valid;
import org.example.app.models.Book;
import org.example.app.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    private BookService service;

    @GetMapping("/books")
    public List<Book> getAll() {
        return service.getAll();
    }

    @GetMapping("/books/{id}")
    public Book getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping("/books")
    public Book create(@RequestBody @Valid Book book) {
        return service.create(book);
    }

    @PutMapping("/books/{id}")
    public Book update(@PathVariable Long id, @RequestBody Book book) {
        return service.update(id, book);
    }

    @DeleteMapping("/books/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/books/search")
    public List<Book> search(@RequestParam String keyword) {
        return service.search(keyword);
    }
}
