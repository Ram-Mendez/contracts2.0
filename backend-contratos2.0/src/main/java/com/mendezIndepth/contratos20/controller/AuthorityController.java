package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.AuthorityEntity;
import com.mendezIndepth.contratos20.model.AuthorityDto;
import com.mendezIndepth.contratos20.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class AuthorityController {

    @Autowired
    private AuthorityRepository authorityRepository;


    @PostMapping("/authorities")
    public AuthorityEntity createAuthority(@RequestBody AuthorityDto authorityDto) {
        AuthorityEntity authority = new AuthorityEntity();
        authority.setName(authorityDto.getName());
        authority.setStatus(authorityDto.getStatus());
        authority.setPriority(authorityDto.getPriority());
        authorityRepository.save(authority);
        return authority;
    }

    @GetMapping("/authorities")
    public List<AuthorityEntity> getContractors() {
        return authorityRepository.findAll();
    }

    @GetMapping("/authorities/{id}")
    public AuthorityEntity getContractorById(@PathVariable Integer id) {
        return authorityRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Authority not found" + id));
    }
}

