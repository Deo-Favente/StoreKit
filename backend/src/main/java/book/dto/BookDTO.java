package book.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class BookDTO {
    @Data
    public static class PostInput {
        private String bookName;
        private Integer bookPages;

        // Getters explicites pour s'assurer qu'ils existent même si Lombok n'est pas traité
        public String getBookName() {
            return this.bookName;
        }

        public Integer getBookPages() {
            return this.bookPages;
        }
    }

    @Data
    public static class PostOutput {
        private String message;
    }
}
