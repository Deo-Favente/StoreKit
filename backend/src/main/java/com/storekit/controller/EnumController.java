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
public class EnumController {

    @GetMapping("/categories")
    public String[] getCategories() {
        ArticleCategory[] categories = ArticleCategory.values();
        String[] categoryStrings = new String[categories.length];
        for (int i = 0; i < categories.length; i++) {
            categoryStrings[i] = categories[i].toString();
        }
        return categoryStrings;
    }

    @GetMapping("/sizes")
    public String[] getSizes() {
        ArticleSize[] sizes = ArticleSize.values();
        String[] sizeStrings = new String[sizes.length];
        for (int i = 0; i < sizes.length; i++) {
            sizeStrings[i] = sizes[i].toString();
        }
        return sizeStrings;
    }

    @GetMapping("/conditions")
    public String[] getConditions() {
        ArticleCondition[] conditions = ArticleCondition.values();
        String[] conditionStrings = new String[conditions.length];
        for (int i = 0; i < conditions.length; i++) {
            conditionStrings[i] = conditions[i].toString();
        }
        return conditionStrings;
    }

    @GetMapping("/states")
    public String[] getStates() {
        ArticleState[] states = ArticleState.values();
        String[] stateStrings = new String[states.length];
        for (int i = 0; i < states.length; i++) {
            stateStrings[i] = states[i].toString();
        }
        return stateStrings;
    }
}
