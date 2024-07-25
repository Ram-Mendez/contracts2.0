package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.AdministratorEntity;
import com.mendezIndepth.contratos20.entity.AuthorityEntity;
import com.mendezIndepth.contratos20.entity.ContractorEntity;
import com.mendezIndepth.contratos20.entity.ContratosEntity;
import com.mendezIndepth.contratos20.model.ContractDto;
import com.mendezIndepth.contratos20.repository.AdministratorRepository;
import com.mendezIndepth.contratos20.repository.AuthorityRepository;
import com.mendezIndepth.contratos20.repository.ContractRepository;
import com.mendezIndepth.contratos20.repository.ContractorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
    @Autowired
    private AdministratorRepository administratorRepository;

    @GetMapping("/contracts")
    public List<ContratosEntity> getAllContracts() {
        return contractRepository.findAll();
    }

    @GetMapping("/contracts/{id}")
    public ContratosEntity getContractByid(@PathVariable Integer id) {
        return contractRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Contract not found" + id));
    }

    @PostMapping("/contracts")
    public ContratosEntity createContract(@RequestBody ContractDto contractDto) {
        if (contractDto.getAuthorityId() == null) {
            throw new IllegalArgumentException("Authority ID must not be null");
        }
        if (contractDto.getContractorId() == null) {
            throw new IllegalArgumentException("Contractor ID must not be null");
        }

        AuthorityEntity authority = authorityRepository.findById(contractDto.getAuthorityId())
                .orElseThrow(() -> new NoSuchElementException("Authority not found: " + contractDto.getAuthorityId()));
        ContractorEntity contractor = contractorRepository.findById(contractDto.getContractorId())
                .orElseThrow(() -> new NoSuchElementException("Contractor not found: " + contractDto.getContractorId()));

        ContratosEntity contract = new ContratosEntity();
        contract.setName(contractDto.getName());
        contract.setAuthority(authority);
        contract.setContractor(contractor);
        contract.setStartDate(contractDto.getStartDate());
        contract.setEndDate(contractDto.getEndDate());

        return contractRepository.save(contract);
    }


    @PutMapping("/contracts/{id}")
    public ContratosEntity updateContract(@PathVariable Integer id, @RequestBody ContractDto contractDto) {
        ContratosEntity contract = contractRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Contract not found" + id));
        AuthorityEntity authority = authorityRepository.findById(contractDto.getAuthorityId())
                .orElseThrow(() -> new NoSuchElementException("Authority not found" + contractDto.getAuthorityId()));
        ContractorEntity contractor = contractorRepository.findById(contractDto.getContractorId())
                .orElseThrow(() -> new NoSuchElementException("Contractor not found" + contractDto.getContractorId()));

        contract.setName(contractDto.getName());
        contract.setAuthority(authority);
        contract.setContractor(contractor);
        contract.setEndDate(contractDto.getEndDate());
        return contractRepository.save(contract);
    }

    @DeleteMapping("/contracts/{id}")
    @Transactional
    public void deleteContract(@PathVariable Integer id) {
        AdministratorEntity administrator = administratorRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Administrator not found" + id));
        administratorRepository.delete(administrator);
        ContractorEntity contractor = contractorRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Contractor not found" + id));
        contractorRepository.delete(contractor);
        AuthorityEntity authority = authorityRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Authority not found" + id));
        authorityRepository.delete(authority);

        contractRepository.deleteById(id);
    }

}
