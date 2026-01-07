package com.storekit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Builder
public class ArticleDTO {
    @Data
    public static class PostInput {
        private String name;
        private String description;
        private Double price;
        private Long brandId;
        private String category;
        private String size;
        private String color;
        private Integer stock;
        private String condition;
        private String detailCondition;
        private String state;
    }

    @Data
    public static class PostOutput {
        private String message;
    }
}
