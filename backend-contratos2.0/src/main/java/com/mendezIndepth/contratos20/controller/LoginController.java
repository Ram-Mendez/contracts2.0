package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.UserEntity;
import com.mendezIndepth.contratos20.model.UserDto;
import com.mendezIndepth.contratos20.service.UserServiceImpl;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    private final UserServiceImpl userService;

    @Autowired
    public LoginController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserEntity createUser(@RequestBody UserDto user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        return userService.saveUser(userEntity);
    }


    @PostMapping("/login")
    public UserEntity login(@RequestBody UserDto loginUser) {
        UserEntity userEntity = userService.findByEmail(loginUser.getEmail());
        if (userEntity != null && userEntity.getPassword().equals(loginUser.getPassword())) {
            return userEntity;
        }
        return null;
    }

    @GetMapping("/users/{id}")
    public UserEntity getUser(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

}
