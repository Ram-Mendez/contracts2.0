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

    @GetMapping("/contractors")
    public List<ContractorEntity> getContractors() {
        return contractorRepository.findAll();
    }

    @GetMapping("/contractors/{id}")
    public ContractorEntity getContractorById(@PathVariable Integer id) {
        return contractorRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Contractor not found" + id));
    }

    @PostMapping("/contractors")
    public ContractorEntity createContractor(@RequestBody ContractorDto contractorDto) {
        ContractorEntity contractor = new ContractorEntity();
        contractor.setName(contractorDto.getName());
        contractorRepository.save(contractor);
        return contractor;
    }
}
