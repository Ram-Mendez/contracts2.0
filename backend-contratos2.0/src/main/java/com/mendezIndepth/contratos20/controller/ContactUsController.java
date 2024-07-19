package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.ContactUsEntity;
import com.mendezIndepth.contratos20.model.ContactUsDto;
import com.mendezIndepth.contratos20.repository.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class ContactUsController {

    @Autowired
    private ContactUsRepository contactUsRepository;

    @PostMapping("/contact-us")
    public ContactUsEntity sendContactMessage(@RequestBody ContactUsDto contactUsDto) {
        ContactUsEntity contactUsEntity = new ContactUsEntity();
        contactUsEntity.setName(contactUsDto.getName());
        contactUsEntity.setEmail(contactUsDto.getEmail());
        contactUsEntity.setMessage(contactUsDto.getMessage());
        return contactUsRepository.save(contactUsEntity);
    }
}
