package book.service;

import book.model.exception.BookCreationException;
import book.persistence.BookRepository;
import book.model.BookEntity;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public String createBook(String bookName, Integer bookPages) throws BookCreationException {
        if (bookName == null || bookName.isEmpty()) {
            throw new BookCreationException("Book name cannot be empty.");
        }
        if (bookPages == null || bookPages <= 0) {
            throw new BookCreationException("Book pages must be positive.");
        }

        BookEntity existingBook = bookRepository.findByNameAndPages(bookName, bookPages);
        if (existingBook == null) {
            BookEntity newBook = new BookEntity().builder().name(bookName).pages(bookPages
            ).build();
            bookRepository.save(newBook);
            return "Book created successfully.";
        } else {
            throw new BookCreationException("Book already exists.");
        }
    }
}
