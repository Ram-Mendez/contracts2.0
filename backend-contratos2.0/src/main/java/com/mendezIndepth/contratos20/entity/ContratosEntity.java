package com.mendezIndepth.contratos20.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "contract_entity")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContratosEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "contractor_id")
    private ContractorEntity contractor;
    @ManyToOne
    @JoinColumn(name = "authority_id")
    private AuthorityEntity authority;
    private LocalDate startDate;

}
