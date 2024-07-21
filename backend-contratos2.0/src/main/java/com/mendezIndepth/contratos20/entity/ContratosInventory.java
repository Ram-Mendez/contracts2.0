package com.mendezIndepth.contratos20.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "contratos_inventory")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContratosInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "item_name")
    private String itemName;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    @Column(name = "total_value")
    private BigDecimal totalValue;
    @ManyToOne
    @JoinColumn(name = "contrato_id")
    private ContratosEntity contrato;

}
