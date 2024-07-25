package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.AdministratorEntity;
import com.mendezIndepth.contratos20.entity.UserEntity;
import com.mendezIndepth.contratos20.model.AdministratorDto;
import com.mendezIndepth.contratos20.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    @Autowired
    private RolesRepository rolesRepository;

    @PostMapping("/administrators")
    public AdministratorEntity createAdministrator(@RequestBody AdministratorDto newAdministrator) {
        AdministratorEntity administrator = new AdministratorEntity();
        administrator.setEmail(newAdministrator.getEmail());
        administrator.setContratos(contractRepository.findById(newAdministrator.getContrato())
                .orElseThrow(() -> new RuntimeException("Contract not found")));
        administrator.setAuthority(authorityRepository.findById(newAdministrator.getAuthority())
                .orElseThrow(() -> new RuntimeException("Authority not found")));
        administrator.setUser(userRepository.findById(newAdministrator.getUser())
                .orElseThrow(() -> new RuntimeException("User not found")));
        administrator.setRoles(rolesRepository.findById(newAdministrator.getRoles())
                .orElseThrow(() -> new RuntimeException("Roles not found")));

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
        administratorEntity.setEmail(administrator.getEmail());
        administratorEntity.setContratos(contractRepository.findById(administrator.getContrato()).orElse(null));
        administratorEntity.setAuthority(authorityRepository.findById(administrator.getAuthority()).orElse(null));
        administratorEntity.setUser(userRepository.findById(administrator.getUser()).orElse(null));
        administratorEntity.setRoles(rolesRepository.findById(administrator.getRoles()).orElse(null));

        return administratorRepository.save(administratorEntity);


    }


    @DeleteMapping("/administrators/{id}")
    public void deleteAdministrator(@PathVariable Integer id) {
        administratorRepository.deleteById(id);
    }

}
