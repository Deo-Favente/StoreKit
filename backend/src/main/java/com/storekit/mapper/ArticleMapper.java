package com.storekit.mapper;

import com.storekit.dto.ArticleDTO;
import com.storekit.enumeration.ArticleCategory;
import com.storekit.enumeration.ArticleCondition;
import com.storekit.enumeration.ArticleSize;
import com.storekit.enumeration.ArticleState;
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
        if (article.getCategory() != null) dto.setCategory(article.getCategory().getValue());
        if (article.getBrand() != null) dto.setBrandId(article.getBrand().getId());
        if (article.getSize() != null) dto.setSize(article.getSize().getValue());
        if (article.getCondition() != null) dto.setCondition(article.getCondition().getValue());
        dto.setDetailCondition(article.getDetailCondition());
        if (article.getState() != null) dto.setState(article.getState().getValue());
        dto.setPhotoCount(article.getPhotoCount());
        return dto;
    }

    public ArticleEntity toEntity(ArticleDTO dto, BrandEntity brand) {
        ArticleEntity article = new ArticleEntity();
        article.setId(dto.getId());
        article.setName(dto.getName());
        article.setPrice(dto.getPrice());
        article.setCategory(ArticleCategory.fromValue(dto.getCategory()));
        article.setBrand(brand);
        article.setSize(ArticleSize.fromValue(dto.getSize()));
        article.setCondition(ArticleCondition.fromValue(dto.getCondition()));
        article.setDetailCondition(dto.getDetailCondition());
        article.setState(ArticleState.fromValue(dto.getState()));
        article.setPhotoCount(dto.getPhotoCount());
        return article;
    }
}