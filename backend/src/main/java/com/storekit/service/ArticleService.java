package com.storekit.service;

import com.storekit.dto.ArticleDTO;
import com.storekit.mapper.ArticleMapper;
import com.storekit.model.ArticleEntity;
import com.storekit.model.BrandEntity;
import com.storekit.repository.ArticleRepository;
import com.storekit.repository.BrandRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final BrandRepository brandRepository;
    private final ArticleMapper articleMapper;

    public ArticleDTO createArticle(ArticleDTO dto) {
        BrandEntity brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new EntityNotFoundException("Marque non trouvée"));

        ArticleEntity article = articleMapper.toEntity(dto, brand);
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

        BrandEntity brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new EntityNotFoundException("Marque non trouvée"));

        article.setName(dto.getName());
        article.setPrice(dto.getPrice());
        article.setCategory(dto.getCategory());
        article.setBrand(brand);
        article.setSize(dto.getSize());
        article.setCondition(dto.getCondition());
        article.setDetailCondition(dto.getDetailCondition());
        article.setState(dto.getState());
        article.setPhotoCount(dto.getPhotoCount());

        ArticleEntity updated = articleRepository.save(article);
        return articleMapper.toDTO(updated);
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}