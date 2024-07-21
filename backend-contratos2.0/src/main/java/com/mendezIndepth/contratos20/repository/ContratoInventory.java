package com.mendezIndepth.contratos20.repository;

import com.mendezIndepth.contratos20.entity.ContratosEntity;
import com.mendezIndepth.contratos20.entity.ContratosInventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContratoInventory extends JpaRepository<ContratosInventory, Integer> {
    List<ContratosInventory> findByContratoId(Integer contratoId);
}
