package com.mendezIndepth.contratos20.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "administrator", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "contratos_id",
                "authority_id",
                "user_id"
        })
})
public class AdministratorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn
    private ContratosEntity contracts;
    @ManyToOne
    @JoinColumn
    private AuthorityEntity authority;
    @ManyToOne
    @JoinColumn
    private UserEntity user;
}
