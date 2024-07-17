package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.UserEntity;
import com.mendezIndepth.contratos20.model.UserDto;
import com.mendezIndepth.contratos20.service.UserServiceImpl;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private final UserServiceImpl userService;

    @Autowired
    public LoginController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody UserDto loggingUser) {
        UserEntity user = userService.findByEmail(loggingUser.getEmail());
        return user != null && user.getPassword().equals(loggingUser.getPassword());

    }
}
