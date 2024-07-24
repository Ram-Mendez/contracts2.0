package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.RolesEntity;
import com.mendezIndepth.contratos20.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class RolesController {

    @Autowired
    private RolesRepository rolesRepository;


    @PostMapping("/roles")
    public RolesEntity createRole(@RequestBody RolesEntity rolesEntity) {
        RolesEntity role = new RolesEntity();
        role.setName(rolesEntity.getName());
        role.setDescription(rolesEntity.getDescription());
        return rolesRepository.save(role);
    }

    @GetMapping("/roles")
    public List<RolesEntity> getRoles() {
        List<RolesEntity> rolesList = new ArrayList<>();
        rolesRepository.findAll().forEach(rolesList::add);
        return rolesList;
    }

    @DeleteMapping("/roles/{id}")
    public void deleteRole(@PathVariable Integer id) {
        rolesRepository.deleteById(id);
    }


}
