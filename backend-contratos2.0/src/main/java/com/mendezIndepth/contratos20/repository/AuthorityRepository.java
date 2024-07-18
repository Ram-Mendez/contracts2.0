package com.mendezIndepth.contratos20.repository;

import com.mendezIndepth.contratos20.entity.AuthorityEntity;
import com.mendezIndepth.contratos20.model.AuthorityDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends JpaRepository<AuthorityEntity, Integer> {
}
