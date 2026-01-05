package com.storekit.controller;

import com.storekit.enumeration.ArticleCategory;
import com.storekit.enumeration.ArticleCondition;
import com.storekit.enumeration.ArticleSize;
import com.storekit.enumeration.ArticleState;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/enums")
@CrossOrigin(origins = "*")
public class EnumController {

    @GetMapping("/categories")
    public ArticleCategory[] getCategories() {
        return ArticleCategory.values();
    }

    @GetMapping("/sizes")
    public ArticleSize[] getSizes() {
        return ArticleSize.values();
    }

    @GetMapping("/conditions")
    public ArticleCondition[] getConditions() {
        return ArticleCondition.values();
    }

    @GetMapping("/states")
    public ArticleState[] getStates() {
        return ArticleState.values();
    }
}
