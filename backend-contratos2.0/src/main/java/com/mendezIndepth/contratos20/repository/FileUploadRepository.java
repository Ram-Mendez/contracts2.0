package com.mendezIndepth.contratos20.repository;

import com.mendezIndepth.contratos20.entity.FileUploadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileUploadRepository extends JpaRepository<FileUploadEntity, Integer> {
    List<FileUploadEntity> findByContratoId(Integer contratoId);
}
