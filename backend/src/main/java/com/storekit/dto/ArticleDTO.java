package com.storekit.dto;

import com.storekit.enumeration.ArticleCategory;
import com.storekit.enumeration.ArticleCondition;
import com.storekit.enumeration.ArticleSize;
import com.storekit.enumeration.ArticleState;
import lombok.Data;

@Data
public class ArticleDTO {
    private Long id;
    private String name;
    private Double price;
    private String category;
    private Long brandId;
    private String size;
    private String condition;
    private String detailCondition;
    private String state;
    private Integer photoCount;
}

