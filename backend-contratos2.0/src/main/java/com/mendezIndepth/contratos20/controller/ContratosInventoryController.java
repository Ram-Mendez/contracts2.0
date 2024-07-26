package com.mendezIndepth.contratos20.controller;

import com.mendezIndepth.contratos20.entity.ContractorEntity;
import com.mendezIndepth.contratos20.entity.ContratosEntity;
import com.mendezIndepth.contratos20.entity.ContratosInventory;
import com.mendezIndepth.contratos20.model.ContratoInventoryDto;
import com.mendezIndepth.contratos20.repository.ContractRepository;
import com.mendezIndepth.contratos20.repository.ContratoInventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
public class ContratosInventoryController {

    @Autowired
    private ContratoInventory inventoryRepository;
    @Autowired
    private ContractRepository contractRepository;

    @PostMapping("/contracts-inventory/{contractId}")
    public ContratosInventory createInventoryItem(@PathVariable Integer contractId, @RequestBody ContratoInventoryDto inventoryDto) {
        ContratosInventory contractInventory = new ContratosInventory();
        ContratosEntity contrato = contractRepository.findById(contractId).orElseThrow(() -> new NoSuchElementException("Contract not found" + contractId));
        contractInventory.setContrato(contrato);
        contractInventory.setItemName(inventoryDto.getItemName());
        contractInventory.setQuantity(inventoryDto.getQuantity());
        contractInventory.setUnitPrice(inventoryDto.getUnitPrice());

        BigDecimal totalValue = inventoryDto.getUnitPrice().multiply(new BigDecimal(inventoryDto.getQuantity()));
        contractInventory.setTotalValue(totalValue);

        return inventoryRepository.save(contractInventory);
    }

    @GetMapping("/contracts-inventory/{contractId}")
    public List<ContratosInventory> getInventoryItems(@PathVariable Integer contractId) {
        return inventoryRepository.findByContratoId(contractId);
    }

    @GetMapping("/inventory/{inventoryId}")
    public ContratosInventory getInventoryItem(@PathVariable Integer inventoryId) {
        return inventoryRepository.findById(inventoryId).orElseThrow(() -> new NoSuchElementException("Inventory item not found" + inventoryId));
    }

    @PutMapping("/contracts-inventory/{contractId}/inventory{inventoryId}")
    @Transactional
    public ContratosInventory updateInventoryItem(@PathVariable Integer contractId, @PathVariable Integer inventoryId, @RequestBody ContratoInventoryDto inventoryDto) {
        ContratosEntity contrato = contractRepository.findById(contractId).orElseThrow(() -> new NoSuchElementException("Contract not found" + contractId));
        ContratosInventory inventoryItem = inventoryRepository.findById(inventoryId).orElseThrow(() -> new NoSuchElementException("Inventory item not found" + inventoryId));
        inventoryItem.setContrato(contrato);
        inventoryItem.setItemName(inventoryDto.getItemName());
        inventoryItem.setQuantity(inventoryDto.getQuantity());
        inventoryItem.setUnitPrice(inventoryDto.getUnitPrice());

        BigDecimal totalValue = inventoryDto.getUnitPrice().multiply(new BigDecimal(inventoryDto.getQuantity()));
        inventoryItem.setTotalValue(totalValue);

        return inventoryRepository.save(inventoryItem);
    }

    @DeleteMapping("/inventory/{id}")
    @Transactional
    public ResponseEntity<HttpStatus> deleteInventoryItem(@PathVariable Integer id) {
        ContratosInventory inventoryItem = inventoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Inventory item not found" + id));


        inventoryRepository.delete(inventoryItem);
        return ResponseEntity.ok().build();
    }
}
