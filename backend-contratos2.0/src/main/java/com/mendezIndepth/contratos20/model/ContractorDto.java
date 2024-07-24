package com.mendezIndepth.contratos20.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContractorDto {

    private int id;
    private String name;
    private int contractId;
    private String phoneNumber;
    private String company;
    private String status;

}
