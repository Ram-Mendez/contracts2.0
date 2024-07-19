package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.AuthorityEntity;
import com.mendezIndepth.contratos20.entity.ContractorEntity;
import com.mendezIndepth.contratos20.entity.ContratosEntity;
import com.mendezIndepth.contratos20.model.ContractDto;
import com.mendezIndepth.contratos20.repository.AuthorityRepository;
import com.mendezIndepth.contratos20.repository.ContractRepository;
import com.mendezIndepth.contratos20.repository.ContractorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.*;

@RestController
public class ContratosController {

    @Autowired
    private ContractRepository contractRepository;
    @Autowired
    private ContractorRepository contractorRepository;
    @Autowired
    private AuthorityRepository authorityRepository;

    @GetMapping("/contracts")
    public List<ContratosEntity> getAllContracts() {
        return contractRepository.findAll();
    }


    @PostMapping("/contracts")
    public ContratosEntity createContract(@RequestBody ContractDto contractDto) {
        AuthorityEntity authority = authorityRepository.findById(contractDto.getAuthorityId())
                .orElseThrow(() -> new NoSuchElementException("Authority not found" + contractDto.getAuthorityId()));
        ContractorEntity contractor = contractorRepository.findById(contractDto.getContractorId())
                .orElseThrow(() -> new NoSuchElementException("Contractor not found" + contractDto.getContractorId()));
        ContratosEntity contract = new ContratosEntity();
        contract.setName(contractDto.getName());
        contract.setAuthority(authority);
        contract.setContractor(contractor);
        contract.setStartDate(LocalDate.now());

        return contractRepository.save(contract);
    }


}
