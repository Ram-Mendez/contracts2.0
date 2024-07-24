package com.mendezIndepth.contratos20.service;

import com.mendezIndepth.contratos20.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {
    UserEntity getUserById(Integer id);

    List<UserEntity> getAllUsers();

    UserEntity saveUser(UserEntity user);

    void deleteUser(Integer id);

    UserEntity findByEmail(String email);

    
}
