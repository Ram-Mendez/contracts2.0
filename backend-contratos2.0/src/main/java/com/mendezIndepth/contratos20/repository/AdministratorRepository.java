package com.mendezIndepth.contratos20.repository;

import com.mendezIndepth.contratos20.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorRepository extends JpaRepository<AdministratorEntity, Integer> {


}
