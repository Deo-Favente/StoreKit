package com.storekit.mapper;

import com.storekit.dto.ArticleDTO;
import com.storekit.model.ArticleEntity;
import com.storekit.model.BrandEntity;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {

    public ArticleDTO toDTO(ArticleEntity article) {
        ArticleDTO dto = new ArticleDTO();
        dto.setId(article.getId());
        dto.setName(article.getName());
        dto.setPrice(article.getPrice());
        dto.setCategory(article.getCategory());
        dto.setBrandId(article.getBrand().getId());
        dto.setSize(article.getSize());
        dto.setCondition(article.getCondition());
        dto.setDetailCondition(article.getDetailCondition());
        dto.setState(article.getState());
        dto.setPhotoCount(article.getPhotoCount());
        return dto;
    }

    public ArticleEntity toEntity(ArticleDTO dto, BrandEntity brand) {
        ArticleEntity article = new ArticleEntity();
        article.setId(dto.getId());
        article.setName(dto.getName());
        article.setPrice(dto.getPrice());
        article.setCategory(dto.getCategory());
        article.setBrand(brand);
        article.setSize(dto.getSize());
        article.setCondition(dto.getCondition());
        article.setDetailCondition(dto.getDetailCondition());
        article.setState(dto.getState());
        article.setPhotoCount(dto.getPhotoCount());
        return article;
    }
}