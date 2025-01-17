package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.RolesEntity;
import com.mendezIndepth.contratos20.entity.UserEntity;
import com.mendezIndepth.contratos20.model.UserDto;
import com.mendezIndepth.contratos20.repository.RolesRepository;
import com.mendezIndepth.contratos20.repository.UserRepository;
import com.mendezIndepth.contratos20.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class UserController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RolesRepository rolesRepository;


    @Autowired
    public UserController(UserService userService, UserRepository userRepository, RolesRepository rolesRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
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
        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setEmail(newUser.getEmail());
        user.setPhoneNumber(newUser.getPhoneNumber());
        user.setRoles(rolesRepository.findById(newUser.getRoles()).orElseThrow(() -> new RuntimeException("Role not found")));

        user.setPassword(newUser.getPassword());

        UserEntity savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Integer id, @RequestBody UserDto userDto) {
        UserEntity user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhoneNumber(userDto.getPhoneNumber());

        user.setRoles(rolesRepository.findById(userDto.getRoles())
                .orElseThrow(() -> new RuntimeException("Role not found")));

        UserEntity updatedUser = userService.saveUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
}
