package com.storekit.controller;

import java.nio.file.Path;
import java.util.stream.Collectors;

import com.storekit.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/api/photos")
@CrossOrigin(origins = "*")
public class FileUploadController {

    @Autowired
    private StorageService storageService;

    @GetMapping("/{id}")
    public String listUploadedFiles(Model model, @PathVariable Long id) {

        model.addAttribute("files", storageService.loadAllArticlePics(id).map(
                        path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                                "serveFile", path.getFileName().toString()).build().toUri().toString())
                .collect(Collectors.toList()));

        return "uploadForm";
    }

    @GetMapping("/{id}}/{number}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable Long id, @PathVariable Integer number) {

        Path path = storageService.loadArticlePic(id, number);
        Resource file = storageService.loadAsResource(path);

        if (file == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("/{id}")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                     @PathVariable Long id,
                                     RedirectAttributes redirectAttributes)
    {

        storageService.storeArticlePic(file, id);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        return "redirect:/";
    }

    @DeleteMapping("/{id}/{number}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id, @PathVariable Integer number) {
        storageService.deleteArticlePic(id, number);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllFiles(@PathVariable Long id) {
        storageService.deleteAllArticlePics(id);
        return ResponseEntity.noContent().build();
    }
}