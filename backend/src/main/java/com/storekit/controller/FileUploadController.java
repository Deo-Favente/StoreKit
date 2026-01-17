package com.storekit.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.storekit.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/articles")
public class FileUploadController {

    @Autowired
    private StorageService storageService;

    /**
     * GET /api/articles/{id}/photos - Liste toutes les URLs des photos d'un article
     */
    @GetMapping("/{id}/photos")
    public ResponseEntity<List<String>> getAllPics(@PathVariable Long id) {
        try {
            List<String> photoUrls = storageService.loadAllArticlePics(id)
                    .sorted(Comparator.comparingInt(this::getNumberFromFile))
                    .map(path -> "/api/articles/" + id + "/photos/" + getNumberFromFile(path))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(photoUrls);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * GET /api/articles/{id}/photos/{filename} - Récupère une photo spécifique
     * Accepte: 1.jpg, 1.png, 1 (sans extension)
     */
    @GetMapping("/{id}/photos/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable Long id, @PathVariable String filename) {
        try {
            // Extrait le numéro du nom de fichier (avec ou sans extension)
            String numberPart = filename.contains(".") ? filename.substring(0, filename.lastIndexOf('.')) : filename;
            Integer number = Integer.parseInt(numberPart);

            Path path = storageService.loadArticlePic(id, number);
            Resource file = storageService.loadAsResource(path);

            if (file == null || !file.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Détermine le type MIME en fonction de l'extension
            String contentType = determineContentType(file.getFilename());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=3600")
                    .body(file);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * POST /api/articles/{id}/photos - Upload une nouvelle photo pour un article
     */
    @PostMapping("/{id}/photos")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,
                                                   @PathVariable Long id) {
        try {
            int fileNumber = storageService.storeArticlePic(file, id);

            if (fileNumber == -1) {
                return ResponseEntity.status(400)
                        .body("Maximum 20 photos per article reached");
            }

            // Retourne l'URL de la photo uploadée
            String photoUrl = "/api/articles/" + id + "/photos/" + fileNumber;
            return ResponseEntity.ok(photoUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error uploading file: " + e.getMessage());
        }
    }

    /**
     * DELETE /api/articles/{id}/photos/{number} - Supprime une photo spécifique
     */
    @DeleteMapping("/{id}/photos/{number}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id, @PathVariable Integer number) {
        try {
            storageService.deleteArticlePic(id, number);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * DELETE /api/articles/{id}/photos - Supprime toutes les photos d'un article
     */
    @DeleteMapping("/{id}/photos")
    public ResponseEntity<Void> deleteAllFiles(@PathVariable Long id) {
        try {
            storageService.deleteAllArticlePics(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    public record SwitchRequest(int number1, int number2) {}
    @PutMapping("/{id}/photos/switch")
    public ResponseEntity<Void> switchPhotos(@PathVariable Long id, @RequestBody SwitchRequest request) {
        storageService.switchArticlePics(id, request.number1(), request.number2());

        return ResponseEntity.noContent().build();
    }

        private int getNumberFromFile(Path path) {
        String fileName = path.getFileName().toString();
        String numberPart = fileName.contains(".") ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;
        return Integer.parseInt(numberPart);
    }

    private String determineContentType(String filename) {
        if (filename == null) {
            return "application/octet-stream";
        }

        String lowerFilename = filename.toLowerCase();
        if (lowerFilename.endsWith(".jpg") || lowerFilename.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (lowerFilename.endsWith(".png")) {
            return "image/png";
        } else if (lowerFilename.endsWith(".gif")) {
            return "image/gif";
        } else if (lowerFilename.endsWith(".webp")) {
            return "image/webp";
        }

        return "application/octet-stream";
    }
}