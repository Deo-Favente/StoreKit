package com.storekit.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "brands")
@Entity
@Data
public class BrandEntity {
    @Id
    private Long id;
    private String name;
}
