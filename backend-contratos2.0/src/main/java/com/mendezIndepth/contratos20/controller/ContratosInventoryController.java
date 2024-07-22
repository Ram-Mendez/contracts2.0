package com.mendezIndepth.contratos20.controller;

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

    @GetMapping("/inventory/{inventoryId}")
    public ContratosInventory getInventoryItem(@PathVariable Integer inventoryId) {
        return inventoryRepository.findById(inventoryId).orElseThrow(() -> new NoSuchElementException("Inventory item not found" + inventoryId));
    }

    @PutMapping("/contracts/{id}/inventory/{inventoryId}")
    @Transactional
    public ContratosInventory updateInventoryItem(@PathVariable Integer id, @PathVariable Integer
            inventoryId, @RequestBody ContratoInventoryDto inventoryDto) {
        ContratosEntity contrato = contractRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Contract not found" + id));
        ContratosInventory inventoryItem = inventoryRepository.findById(inventoryId).orElseThrow(() -> new NoSuchElementException("Inventory item not found" + inventoryId));
        inventoryItem.setContrato(contrato);
        inventoryItem.setItemName(inventoryDto.getItemName());
        inventoryItem.setQuantity(inventoryDto.getQuantity());
        inventoryItem.setUnitPrice(inventoryDto.getUnitPrice());

        return inventoryRepository.save(inventoryItem);
    }

    @DeleteMapping("/contracts/{id}/inventory/{inventoryId}")
    @Transactional
    public ResponseEntity<HttpStatus> deleteInventoryItem(@PathVariable Integer id, @PathVariable Integer inventoryId) {
        ContratosEntity contrato = contractRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Contract not found" + id));
        ContratosInventory inventoryItem = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new NoSuchElementException("Inventory item not found" + inventoryId));

        if (!inventoryItem.getContrato().getId().equals(contrato.getId())) {
            throw new IllegalArgumentException("Inventory item does not belong to the specified contract");
        }
        inventoryRepository.delete(inventoryItem);
        return ResponseEntity.ok().build();
    }
}
