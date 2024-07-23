package com.mendezIndepth.contratos20.model;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ContratoInventoryDto {

    private String itemName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalValue;

}
