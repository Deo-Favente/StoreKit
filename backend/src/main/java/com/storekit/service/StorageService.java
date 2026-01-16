package com.storekit.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import com.storekit.config.StorageProperties;
import com.storekit.model.exception.StorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StorageService {

    private final Path rootLocation;

    @Autowired
    public StorageService(StorageProperties properties) {

        if(properties.getLocation().trim().length() == 0){
            throw new StorageException("File upload location can not be Empty.", null);
        }

        this.rootLocation = Paths.get(properties.getLocation());
    }

    public void store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.", null);
            }
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(file.getOriginalFilename()))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file outside current directory.", null);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    public Stream<Path> loadAllArticlePics(Long articleId) {
        try {
            Path articlePicLocation = this.rootLocation.resolve("articles").resolve(articleId.toString());
            if (Files.exists(articlePicLocation)) {
                return Files.walk(articlePicLocation, 1)
                        .filter(path -> !path.equals(articlePicLocation))
                        .map(articlePicLocation::relativize);
            } else {
                return Stream.empty();
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }
    }

    public Path loadArticlePic(Long articleId, int number) {
        String filename = number + ".jpg";
        Path articlePicLocation = this.rootLocation.resolve("articles").resolve(articleId.toString());
        return articlePicLocation.resolve(filename);
    }

    public void deleteAllArticlePics(Long articleId) {
        Path articlePicLocation = this.rootLocation.resolve("articles").resolve(articleId.toString());
        try {
            FileSystemUtils.deleteRecursively(articlePicLocation);
        } catch (IOException e) {
            throw new StorageException("Failed to delete article pictures", e);
        }
    }

    public void deleteArticlePic(Long articleId, int number) {
        Path articlePicPath = loadArticlePic(articleId, number);
        try {
            Files.deleteIfExists(articlePicPath);
        } catch (IOException e) {
            throw new StorageException("Failed to delete article picture", e);
        }
    }

    public Resource loadAsResource(Path path) {
        try {
            Path file = rootLocation.resolve(path);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                return null;
            }
        }
        catch (MalformedURLException e) {
            throw new StorageException("Could not read file: " + path, e);
        }
    }

    public void storeArticlePic(MultipartFile file, Long articleId) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.", null);
            }
            Path articlePicLocation = this.rootLocation.resolve("articles").resolve(articleId.toString());
            Files.createDirectories(articlePicLocation);

            String filename = "1.jpg"; // TODO: handle multiple pictures per article
            Path destinationFile = articlePicLocation.resolve(
                            Paths.get(filename))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(articlePicLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file outside current directory.", null);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    public void init() {
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}