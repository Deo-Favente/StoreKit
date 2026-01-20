package com.storekit.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class BackupService {

    private static final String DB_PATH = "storekit.db";
    private static final String BACKUP_DIR = "backups/";

    @Scheduled(cron = "0 0 3 * * *") // 3h du matin chaque jour
    public void backupDatabase() {
        try {
            Path backupPath = Paths.get(BACKUP_DIR);
            Files.createDirectories(backupPath);

            String timestamp = LocalDateTime.now()
                    .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String backupFile = BACKUP_DIR + "storekit_" + timestamp + ".db";

            Files.copy(
                    Paths.get(DB_PATH),
                    Paths.get(backupFile),
                    StandardCopyOption.REPLACE_EXISTING
            );

            System.out.println("✅ Database backed up to: " + backupFile);

            // Garder seulement les 7 derniers backups
            cleanOldBackups();

        } catch (IOException e) {
            System.err.println("❌ Backup failed: " + e.getMessage());
        }
    }

    private void cleanOldBackups() throws IOException {
        Files.list(Paths.get(BACKUP_DIR))
                .filter(path -> path.toString().endsWith(".db"))
                .sorted()
                .limit(Math.max(0, Files.list(Paths.get(BACKUP_DIR)).count() - 7))
                .forEach(path -> {
                    try {
                        Files.delete(path);
                    } catch (IOException e) {
                        System.err.println("Failed to delete old backup: " + path);
                    }
                });
    }
}