package com.storekit.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "brands")
@Entity
public class BrandEntity {
    @Id
    private Long id;
    private String name;
}
