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
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class StorageService {

    private final Path rootLocation;

    @Autowired
    public StorageService(StorageProperties properties) {

        if(properties.getLocation().trim().length() == 0){
            throw new StorageException("File upload location can not be Empty.", null);
        }

        this.rootLocation = Paths.get(properties.getLocation());
    }

    public Stream<Path> loadAllArticlePics(Long articleId) {
        try {
            Path articlePicLocation = this.rootLocation.resolve(articleId.toString());
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
        Path articlePicLocation = this.rootLocation.resolve(articleId.toString());
        return articlePicLocation.resolve(filename);
    }

    public void deleteAllArticlePics(Long articleId) {
        Path articlePicLocation = this.rootLocation.resolve(articleId.toString());
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
            Path file = path.toAbsolutePath();
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

    public int storeArticlePic(MultipartFile file, Long articleId) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.", null);
            }
            Path articlePicLocation = this.rootLocation.resolve(articleId.toString());
            Files.createDirectories(articlePicLocation);

            String filename = this.getNextAvailableFilename(articlePicLocation);
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
            return Integer.parseInt(filename.replace(".jpg", ""));
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    public void switchArticlePics(Long articleId, int number1, int number2) {
        Path articlePicLocation = this.rootLocation.resolve(articleId.toString());
        Path filePath1 = articlePicLocation.resolve(number1 + ".jpg");
        Path filePath2 = articlePicLocation.resolve(number2 + ".jpg");
        Path tempFilePath = articlePicLocation.resolve("temp_switch_file.jpg");

        try {
            if (Files.exists(filePath1) && Files.exists(filePath2)) {
                // Rename first file to a temporary name
                Files.move(filePath1, tempFilePath);
                // Rename second file to the first file's original name
                Files.move(filePath2, filePath1);
                // Rename temporary file to the second file's original name
                Files.move(tempFilePath, filePath2);
            } else {
                throw new StorageException("One or both files do not exist.", null);
            }
        } catch (IOException e) {
            throw new StorageException("Failed to switch article pictures", e);
        }
    }

    private String getNextAvailableFilename(Path directory) throws IOException {
        int maxPhotos = 20;
        for (int i = 1; i <= maxPhotos; i++) {
            String filename = i + ".jpg";
            Path filePath = directory.resolve(filename);
            if (!Files.exists(filePath)) {
                return filename;
            }
        }
        throw new StorageException("Maximum number of photos reached for this article.", null);
    }

    public int getNumberOfArticlePics(Long articleId) {
        Path articlePicLocation = this.rootLocation.resolve(articleId.toString());
        try {
            if (Files.exists(articlePicLocation)) {
                return (int) Files.list(articlePicLocation).count();
            } else {
                return 0;
            }
        } catch (IOException e) {
            throw new StorageException("Failed to count article pictures", e);
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