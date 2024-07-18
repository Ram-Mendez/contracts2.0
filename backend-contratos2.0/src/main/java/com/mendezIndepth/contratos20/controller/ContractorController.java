package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.ContractorEntity;
import com.mendezIndepth.contratos20.model.ContractorDto;
import com.mendezIndepth.contratos20.repository.ContractorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractorController {

    @Autowired
    private ContractorRepository contractorRepository;

    @PostMapping("/contractors")
    public ContractorEntity createContractor(@RequestBody ContractorDto contractorDto) {
        ContractorEntity contractor = new ContractorEntity();
        contractor.setName(contractorDto.getName());
        contractorRepository.save(contractor);
        return contractor;
    }
}
