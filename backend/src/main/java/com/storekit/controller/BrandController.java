package com.storekit.controller;

import com.storekit.dto.BrandDTO;
import com.storekit.model.BrandEntity;
import com.storekit.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin(origins = "*")
public class BrandController {

    @Autowired
    public BrandService brandService;

    @PostMapping
    public BrandEntity createBrand(@RequestBody BrandDTO.PostInput brandDTO) {
        BrandEntity brand = new BrandEntity();
        if (brandDTO.getName() != null) {
            brand.setName(brandDTO.getName());
        }
        return brandService.createBrand(brand);
    }

    @GetMapping
    public List<BrandEntity> getAllBrands() {
        return brandService.getAllBrands();
    }
}