package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.ContractorEntity;
import com.mendezIndepth.contratos20.entity.ContratosEntity;
import com.mendezIndepth.contratos20.entity.FileUploadEntity;
import com.mendezIndepth.contratos20.model.FileUploadDto;
import com.mendezIndepth.contratos20.repository.ContractRepository;
import com.mendezIndepth.contratos20.repository.FileUploadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
public class FileUploadController {

    @Autowired
    private FileUploadRepository fileUploadRepository;
    @Autowired
    private ContractRepository contratosRepository;

    @PostMapping("/contracts-inventory/{id}/files/upload")
    public ResponseEntity<FileUploadEntity> storeFile(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        ContratosEntity contrato = contratosRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Contract not found: " + id));

        FileUploadEntity fileToUpload = new FileUploadEntity();
        fileToUpload.setFileName(file.getOriginalFilename());
        fileToUpload.setType(file.getContentType());
        fileToUpload.setContrato(contrato);
        byte[] fileBytes = file.getBytes();
        String base64File = Base64.getEncoder().encodeToString(fileBytes);
        fileToUpload.setFile(base64File);

        fileUploadRepository.save(fileToUpload);

        fileUploadRepository.save(fileToUpload);

        return ResponseEntity.ok(fileToUpload);
    }

    @GetMapping("/contracts-inventory/{id}/files")
    public List<FileUploadEntity> getFilesByContractId(@PathVariable("id") Integer id) {
        if (contratosRepository.existsById(id)) {
            return fileUploadRepository.findAll();
        } else {
            return new ArrayList<>();
        }
    }

    @DeleteMapping("/contracts-inventory/{id}/files/{fileId}")
    public ResponseEntity<Void> deleteFile(@PathVariable Integer id, @PathVariable Integer fileId) {
        ContratosEntity contrato = contratosRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Contract not found: " + id));

        FileUploadEntity fileToDelete = fileUploadRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("File not found: " + fileId));

        if (fileToDelete.getContrato().equals(contrato)) {
            fileUploadRepository.delete(fileToDelete);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/contracts-inventory/{id}/files/{fileId}/download")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Integer id, @PathVariable Integer fileId) {
        ContratosEntity contrato = contratosRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Contract not found: " + id));

        FileUploadEntity fileToDownload = fileUploadRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("File not found: " + fileId));

        if (!fileToDownload.getContrato().equals(contrato)) {
            return ResponseEntity.notFound().build();
        }

        byte[] fileBytes = Base64.getDecoder().decode(fileToDownload.getFile());

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"" + fileToDownload.getFileName() + "\"")
                .header("Content-Type", fileToDownload.getType())
                .body(fileBytes);
    }

}
