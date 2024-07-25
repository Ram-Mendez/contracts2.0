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
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "contractor_id", nullable = true)
    private ContractorEntity contractor;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "authority_id", nullable = true)
    private AuthorityEntity authority;
    private LocalDate startDate;
    private LocalDate endDate;

}
