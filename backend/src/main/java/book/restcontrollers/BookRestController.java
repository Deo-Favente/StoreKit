package book.restcontrollers;

import book.model.exception.BookCreationException;
import book.service.BookService;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("/books")
public class BookRestController {

    private final BookService bookService;

    public BookRestController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public String post(@RequestBody book.dto.BookDTO.PostInput input) throws BookCreationException {
        return bookService.createBook(input.getBookName(), input.getBookPages());
    }
}
