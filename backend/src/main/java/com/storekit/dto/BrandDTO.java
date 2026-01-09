package com.storekit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
public class BrandDTO {
    @Data
    public static class PostInput {
        private String name;

    }
}
