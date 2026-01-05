package com.storekit.model;

import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "brands")
public class BrandEntity {
    @Id
    private Long id;
    private String name;
}
