package com.storekit.controller;

import com.storekit.model.BrandEntity;
import com.storekit.repository.BrandRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class BrandController {

    public BrandRepository brandRepository;

    @PostMapping("/api/brands")
    public void createBrand(@RequestBody String name) {
        BrandEntity brand = new BrandEntity();
        brand.setName(name);
        brandRepository.save(brand);
    }

}
