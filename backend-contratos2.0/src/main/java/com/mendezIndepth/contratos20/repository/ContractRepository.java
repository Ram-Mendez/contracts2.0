package com.mendezIndepth.contratos20.repository;


import com.mendezIndepth.contratos20.entity.ContratosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends JpaRepository<ContratosEntity, Integer> {
    List<ContratosEntity> findContractorById(Integer contractorId);

    List<ContratosEntity> findAuthorityById(Integer authorityId);
}
