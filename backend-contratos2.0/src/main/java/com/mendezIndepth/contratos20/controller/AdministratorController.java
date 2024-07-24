package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.AdministratorEntity;
import com.mendezIndepth.contratos20.model.AdministratorDto;
import com.mendezIndepth.contratos20.repository.AdministratorRepository;
import com.mendezIndepth.contratos20.repository.AuthorityRepository;
import com.mendezIndepth.contratos20.repository.ContractRepository;
import com.mendezIndepth.contratos20.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdministratorController {
    @Autowired
    private AdministratorRepository administratorRepository;
    @Autowired
    private AuthorityRepository authorityRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ContractRepository contractRepository;

    @PostMapping("/administrators")
    public AdministratorEntity createAdministrator(@RequestBody AdministratorDto newAdministrator) {
        AdministratorEntity administrator = new AdministratorEntity();
        administrator.setContracts(contractRepository.findById(newAdministrator.getContrato()).orElse(null));
        administrator.setAuthority(authorityRepository.findById(newAdministrator.getAuthority()).orElse(null));
        administrator.setUser(userRepository.findById(newAdministrator.getUser()).orElse(null));

        return administratorRepository.save(administrator);
    }

    @GetMapping("/administrators")
    public List<AdministratorEntity> getAdministrators() {
        return administratorRepository.findAll();
    }

    @GetMapping("/administrators/{id}")
    public AdministratorEntity getAdministratorById(@PathVariable Integer id) {
        return administratorRepository.findById(id).orElse(null);
    }

    @PutMapping("/administrators/{id}")
    public AdministratorEntity updateAdministrator(@PathVariable Integer id, @RequestBody AdministratorDto administrator) {
        AdministratorEntity administratorEntity = administratorRepository.findById(id).orElse(null);
        if (administratorEntity == null) {
            return null;
        }

        administratorEntity.setContracts(contractRepository.findById(administrator.getContrato()).orElse(null));
        administratorEntity.setAuthority(authorityRepository.findById(administrator.getAuthority()).orElse(null));
        administratorEntity.setUser(userRepository.findById(administrator.getUser()).orElse(null));

        return administratorRepository.save(administratorEntity);

    }

    @DeleteMapping("/administrators/{id}")
    public void deleteAdministrator(@PathVariable Integer id) {
        administratorRepository.deleteById(id);
    }

}
