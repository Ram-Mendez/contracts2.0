package com.mendezIndepth.contratos20.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ContractDto {

    private String name;
    private Integer contractorId;
    private Integer authorityId;
    private LocalDate startDate;


}
