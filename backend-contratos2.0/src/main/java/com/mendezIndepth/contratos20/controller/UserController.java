package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.UserEntity;
import com.mendezIndepth.contratos20.model.UserDto;
import com.mendezIndepth.contratos20.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getUsers() {
        List<UserEntity> listOfUsers = userService.getAllUsers();
        return ResponseEntity.ok(listOfUsers);
    }

    @PostMapping("/users")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserDto newUser) {
        if (newUser == null) {
            return ResponseEntity.badRequest().build();
        }
        UserEntity user = new UserEntity();
        user.setEmail(newUser.getEmail());
        user.setPassword(newUser.getPassword());

        UserEntity savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }
}
