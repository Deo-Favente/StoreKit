package com.storekit.model;

import com.storekit.enumeration.ArticleCategory;
import com.storekit.enumeration.ArticleCondition;
import com.storekit.enumeration.ArticleSize;
import com.storekit.enumeration.ArticleState;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "articles")
public class ArticleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;

    @Enumerated(EnumType.STRING)
    private ArticleCategory category;


    @ManyToOne
    @JoinColumn(name = "brand_id")
       private BrandEntity brand;

    @Enumerated(EnumType.STRING)
    private ArticleSize size;

    @Enumerated(EnumType.STRING)
    private ArticleCondition condition;

    private String detailCondition;

    @Enumerated(EnumType.STRING)
    private ArticleState state;

    private Integer photoCount;
}