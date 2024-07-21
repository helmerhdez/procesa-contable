package com.hhcb.procesacontable.infrastructure.adapter.input.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class FileController {

    @PostMapping("/bill")
    public ResponseEntity<?> bill(@RequestParam("file") MultipartFile file) {
        try {
            if (file == null || file.isEmpty() || !file.getName().contains(".xml")) {
                return ResponseEntity.badRequest().body("No se ha proporcionado ningún archivo, el archivo está vacío o no es un XML.");
            } else {
                String fileName = UUID.randomUUID() + ".xml";
                Path filePath = Paths.get(fileName, ".xml"); //Configurar path en caché

                try (FileOutputStream stream = new FileOutputStream(filePath.toString())) {
                    stream.write(file.getBytes());
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
        return ResponseEntity.badRequest().body("");
    }

    @PostMapping("/InventoryReport")
    public ResponseEntity<?> InventoryReport(@RequestParam("file") MultipartFile file) {
        try {
            if (file == null || file.isEmpty() || !file.getName().contains(".xlsx")) {
                return ResponseEntity.badRequest().body("No se ha proporcionado ningún archivo, el archivo está vacío o no es un XLSX.");
            } else {
                String fileName = UUID.randomUUID() + ".xlsx";
                Path filePath = Paths.get(fileName, ".xlsx"); //Configurar path en caché

                try (FileOutputStream stream = new FileOutputStream(filePath.toString())) {
                    stream.write(file.getBytes());
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
        return ResponseEntity.badRequest().body("");
    }

    @GetMapping("/InventoryReport/{fileName}")
    public ResponseEntity<?> InventoryReport(String fileName) {
        try {
            try (FileInputStream fileInputStream = new FileInputStream("C:"); //Configurar path en caché
                 ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
                byte[] buffer = new byte[1024];
                int length;
                while ((length = fileInputStream.read(buffer)) != -1) {
                    byteArrayOutputStream.write(buffer, 0, length);
                }
                return ResponseEntity.ok().body(byteArrayOutputStream.toByteArray());
            }
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
}
