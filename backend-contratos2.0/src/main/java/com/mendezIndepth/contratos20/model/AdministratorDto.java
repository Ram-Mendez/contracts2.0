package com.mendezIndepth.contratos20.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdministratorDto {
    private Integer id;
    private String email;
    private Integer contrato;
    private Integer authority;
    private Integer user;
    private Integer roles;

}
