package com.storekit.service;

import com.storekit.model.ArticleEntity;
import com.storekit.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public List<ArticleEntity> getAllArticles() {
        return articleRepository.findAll();
    }

    public ArticleEntity getArticleById(Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    public ArticleEntity createArticle(ArticleEntity article) {
        return articleRepository.save(article);
    }

    public ArticleEntity updateArticle(Long id, ArticleEntity article) {
        article.setId(id);
        return articleRepository.save(article);
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}