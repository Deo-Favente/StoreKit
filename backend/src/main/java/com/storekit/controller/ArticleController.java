package com.storekit.controller;

import com.storekit.dto.ArticleDTO;
import com.storekit.enumeration.ArticleCategory;
import com.storekit.enumeration.ArticleCondition;
import com.storekit.enumeration.ArticleSize;
import com.storekit.enumeration.ArticleState;
import com.storekit.model.ArticleEntity;
import com.storekit.repository.BrandRepository;
import com.storekit.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "*")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    @Autowired
    private BrandRepository brandRepository;

    @GetMapping
    public List<ArticleEntity> getAll() {
        return articleService.getAllArticles();
    }

    @GetMapping("/{id}")
    public ArticleEntity getOne(@PathVariable Long id) {
        return articleService.getArticleById(id);
    }

    @PostMapping
    public ArticleEntity create(@RequestBody ArticleDTO.PostInput articleDTO) {
        ArticleEntity article = new ArticleEntity();
        // for each field, try to map from DTO to Entity if not null
        if (articleDTO.getName() != null) {
            article.setName(articleDTO.getName());
        }
        if (articleDTO.getPrice() != null) {
            article.setPrice(articleDTO.getPrice());
        }
        if (articleDTO.getBrandName() != null) {
            article.setBrand(brandRepository.findByName(articleDTO.getBrandName()));
        }
        if (articleDTO.getCategory() != null) {
            article.setCategory(ArticleCategory.valueOf(articleDTO.getCategory()));
        }
        if (articleDTO.getSize() != null) {
            article.setSize(ArticleSize.valueOf(articleDTO.getSize()));
        }
        if (articleDTO.getCondition() != null) {
            article.setCondition(ArticleCondition.valueOf(articleDTO.getCondition()));
        }
        if (articleDTO.getDetailCondition() != null) {
            article.setDetailCondition(articleDTO.getDetailCondition());
        }
        if (articleDTO.getState() != null) {
            article.setState(ArticleState.valueOf(articleDTO.getState()));
        }

        return articleService.createArticle(article);
    }

    @PutMapping("/{id}")
    public ArticleEntity update(@RequestBody ArticleEntity article) {
        return articleService.updateArticle(article);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        articleService.deleteArticle(id);
    }
}