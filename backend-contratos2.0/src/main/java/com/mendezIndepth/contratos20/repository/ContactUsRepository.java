package com.mendezIndepth.contratos20.repository;

import com.mendezIndepth.contratos20.entity.ContactUsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactUsRepository extends JpaRepository<ContactUsEntity, Integer> {
}
