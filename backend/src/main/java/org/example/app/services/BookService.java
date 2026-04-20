package org.example.app.services;

import org.example.app.models.Book;
import org.example.app.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository repo;

    public List<Book> getAll() {
        return repo.findAll();
    }

    public Book getById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public Book create(Book book) {
        return repo.save(book);
    }

    public Book update(Long id, Book book) {
        Book b = getById(id);
        b.setTitle(book.getTitle());
        b.setAuthor(book.getAuthor());
        b.setCategory(book.getCategory());
        b.setPublisher(book.getPublisher());
        b.setPublishedYear(book.getPublishedYear());
        b.setQuantity(book.getQuantity());
        b.setDescription(book.getDescription());
        b.setImageUrl(book.getImageUrl());
        return repo.save(b);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Book> search(String keyword) {
        return repo.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                keyword, keyword, keyword
        );
    }
}
