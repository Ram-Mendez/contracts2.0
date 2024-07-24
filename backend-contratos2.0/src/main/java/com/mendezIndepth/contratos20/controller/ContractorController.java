package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.ContractorEntity;
import com.mendezIndepth.contratos20.model.ContractorDto;
import com.mendezIndepth.contratos20.repository.ContractorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class ContractorController {

    @Autowired
    private ContractorRepository contractorRepository;

    @PostMapping("/contractors")
    public ContractorEntity createContractor(@RequestBody ContractorDto contractorDto) {
        ContractorEntity contractor = new ContractorEntity();
        contractor.setName(contractorDto.getName());
        contractor.setPhoneNumber(contractorDto.getPhoneNumber());
        contractor.setCompany(contractorDto.getCompany());
        contractor.setStatus(ContractorEntity.Status.valueOf(contractorDto.getStatus().toUpperCase())); // Map status from DTO
        System.out.println("Contractor created");
        return contractorRepository.save(contractor);
    }

    @GetMapping("/contractors")
    public List<ContractorEntity> getContractors() {
        return contractorRepository.findAll();
    }

    @GetMapping("/contractors/{id}")
    public ContractorEntity getContractorById(@PathVariable Integer id) {
        return contractorRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Contractor not found" + id));
    }

    @PutMapping("/contractors/{id}")
    public ContractorEntity updateContractor(@PathVariable Integer id, @RequestBody ContractorDto contractorDto) {
        ContractorEntity contractor = contractorRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Contractor not found" + id));
        contractor.setName(contractorDto.getName());
        contractor.setPhoneNumber(contractorDto.getPhoneNumber());
        contractor.setCompany(contractorDto.getCompany());
        contractor.setStatus(ContractorEntity.Status.valueOf(contractorDto.getStatus().toUpperCase())); // Map status from DTO
        return contractorRepository.save(contractor);
    }

    @DeleteMapping("/contractors/{id}")
    public void deleteContractor(@PathVariable Integer id) {
        contractorRepository.deleteById(id);
    }
}
