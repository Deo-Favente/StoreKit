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
    private ArticleCategory category;
    private Long brandId;
    private ArticleSize size;
    private ArticleCondition condition;
    private String detailCondition;
    private ArticleState state;
    private Integer photoCount;
}

