package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.ContratosEntity;
import com.mendezIndepth.contratos20.entity.ContratosInventory;
import com.mendezIndepth.contratos20.model.ContratoInventoryDto;
import com.mendezIndepth.contratos20.repository.ContractRepository;
import com.mendezIndepth.contratos20.repository.ContratoInventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
public class ContratosInventoryController {

    @Autowired
    private ContratoInventory inventoryRepository;
    @Autowired
    private ContractRepository contractRepository;

    @PostMapping("/contracts/{id}/inventory")
    public ContratosInventory createInventoryItem(@PathVariable Integer id, @RequestBody ContratoInventoryDto inventoryDto) {
        ContratosEntity contract = contractRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Contract not found" + id));
        ContratosInventory contractInventory = new ContratosInventory();
        contractInventory.setContrato(contract);
        contractInventory.setItemName(inventoryDto.getItemName());
        contractInventory.setQuantity(inventoryDto.getQuantity());
        contractInventory.setUnitPrice(inventoryDto.getUnitPrice());

        BigDecimal totalValue = inventoryDto.getUnitPrice().multiply(new BigDecimal(inventoryDto.getQuantity()));
        contractInventory.setTotalValue(totalValue);

        return inventoryRepository.save(contractInventory);
    }

    @GetMapping("/contracts/{id}/inventory")
    public List<ContratosInventory> getInventoryItems(@PathVariable Integer id) {
        return inventoryRepository.findByContratoId(id);
    }

    // method works but needs improvement to include contract
    // reasearch if the passing of the contract is needed
    @PutMapping("/inventory/{inventoryId}")
    public ContratosInventory updateInventoryItem(@PathVariable Integer inventoryId, @RequestBody ContratoInventoryDto inventoryDto) {
        ContratosInventory contractInventory = inventoryRepository.findById(inventoryId).orElseThrow(() -> new NoSuchElementException("Inventory item not found" + inventoryId));
        contractInventory.setItemName(inventoryDto.getItemName());
        contractInventory.setQuantity(inventoryDto.getQuantity());
        contractInventory.setUnitPrice(inventoryDto.getUnitPrice());

        return inventoryRepository.save(contractInventory);
    }
}
