package com.storekit.service;

import com.storekit.dto.ArticleDTO;
import com.storekit.enumeration.ArticleCategory;
import com.storekit.enumeration.ArticleCondition;
import com.storekit.enumeration.ArticleSize;
import com.storekit.enumeration.ArticleState;
import com.storekit.mapper.ArticleMapper;
import com.storekit.model.ArticleEntity;
import com.storekit.model.BrandEntity;
import com.storekit.repository.ArticleRepository;
import com.storekit.repository.BrandRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArticleService {

    @Autowired
    private final ArticleRepository articleRepository;
    @Autowired
    private final BrandRepository brandRepository;
    @Autowired
    private final ArticleMapper articleMapper;

    public ArticleDTO createArticle(ArticleDTO dto) {

        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }

        BrandEntity brand = null;
        if (dto.getBrandId() != null) {
            brand = brandRepository.findById(dto.getBrandId())
                    .orElse(null);
        }

        ArticleEntity article = new ArticleEntity();
        article.setName(dto.getName());
        article.setPrice(dto.getPrice());
        if (dto.getCategory() != null) article.setCategory(ArticleCategory.fromValue(dto.getCategory()));
        if (dto.getSize() != null) article.setSize(ArticleSize.fromValue(dto.getSize()));
        if (dto.getCondition() != null) article.setCondition(ArticleCondition.fromValue(dto.getCondition()));
        article.setDetailCondition(dto.getDetailCondition());
        if (dto.getState() != null) article.setState(ArticleState.fromValue(dto.getState()));
        article.setPhotoCount(dto.getPhotoCount());
        article.setBrand(brand);

        ArticleEntity saved = articleRepository.save(article);
        return articleMapper.toDTO(saved);
    }


    public List<ArticleDTO> getAllArticles() {
        return articleRepository.findAll().stream()
                .map(articleMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ArticleDTO getArticleById(Long id) {
        ArticleEntity article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article non trouvé"));
        return articleMapper.toDTO(article);
    }

    public ArticleDTO updateArticle(Long id, ArticleDTO dto) {
        ArticleEntity article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article non trouvé"));

        if (dto.getBrandId() != null) {
            BrandEntity brand = brandRepository.findById(dto.getBrandId())
                    .orElseThrow(() -> new EntityNotFoundException("Marque non trouvée"));
            article.setBrand(brand);
        }

        article.setName(dto.getName());
        article.setPrice(dto.getPrice());

        if (dto.getCategory() != null) {
            article.setCategory(ArticleCategory.fromValue(dto.getCategory()));
        }

        if (dto.getSize() != null) {
            article.setSize(ArticleSize.fromValue(dto.getSize()));
        }

        if (dto.getCondition() != null) {
            article.setCondition(ArticleCondition.fromValue(dto.getCondition()));
        }

        if (dto.getState() != null) {
            article.setState(ArticleState.fromValue(dto.getState()));
        }

        if (dto.getDetailCondition() != null) {
            article.setDetailCondition(dto.getDetailCondition());
        }

        if (dto.getPhotoCount() != null) {
            article.setPhotoCount(dto.getPhotoCount());
        }

        return articleMapper.toDTO(articleRepository.save(article));
    }


    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}