package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.AuthorityEntity;
import com.mendezIndepth.contratos20.model.AuthorityDto;
import com.mendezIndepth.contratos20.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorityController {

    @Autowired
    private AuthorityRepository authorityRepository;


    @PostMapping("/authorities")
    public AuthorityEntity createAuthority(@RequestBody AuthorityDto authorityDto) {
        AuthorityEntity authority = new AuthorityEntity();
        authority.setName(authorityDto.getName());
        authorityRepository.save(authority);
        return authority;
    }
}

