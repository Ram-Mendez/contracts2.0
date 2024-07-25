package com.mendezIndepth.contratos20.model;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class UserDto {

    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Integer roles;


}
