package com.storekit.service;

import com.storekit.model.BrandEntity;
import com.storekit.repository.BrandRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;
    public List<BrandEntity> getAllBrands() {
        return brandRepository.findAll();
    }

    public BrandEntity getBrandById(Long id) {
        return brandRepository.findById(id).orElse(null);
    }

    public BrandEntity createBrand(BrandEntity brand) {
        return brandRepository.save(brand);
    }

    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }
}