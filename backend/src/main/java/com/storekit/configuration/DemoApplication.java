package com.storekit.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = {"com.storekit.repository"}) // Activer les repositories JPA dans le package spécifié
@SpringBootApplication(scanBasePackages = {"com.storekit"})// Application Spring Boot
@EntityScan(basePackages = {"com.storekit.model"}) // Scanner les entités JPA dans le package spécifié
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args); // Lancer l'application Spring Boot
	}
	
}
