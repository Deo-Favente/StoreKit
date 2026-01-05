package com.storekit.controller;

import com.storekit.model.ArticleEntity;
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

    @GetMapping
    public List<ArticleEntity> getAll() {
        return articleService.getAllArticles();
    }

    @GetMapping("/{id}")
    public ArticleEntity getOne(@PathVariable Long id) {
        return articleService.getArticleById(id);
    }

    @PostMapping
    public ArticleEntity create(@RequestBody ArticleEntity article) {
        return articleService.createArticle(article);
    }

    @PutMapping("/{id}")
    public ArticleEntity update(@PathVariable Long id, @RequestBody ArticleEntity article) {
        return articleService.updateArticle(id, article);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        articleService.deleteArticle(id);
    }
}