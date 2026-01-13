package com.storekit.model;

import com.fasterxml.jackson.annotation.JsonValue;
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
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
@Data
@Table(name = "articles")
public class ArticleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "article_seq")
    @SequenceGenerator(
            name = "article_seq",
            sequenceName = "article_sequence",
            initialValue = 1000,
            allocationSize = 1
    )
    private Long id;

    private String name;
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

    @Enumerated(EnumType.ORDINAL)
    private ArticleState state = ArticleState.IN_STOCK;

    private Integer photoCount;
}