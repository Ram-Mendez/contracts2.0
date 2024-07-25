package com.mendezIndepth.contratos20.repository;

import com.mendezIndepth.contratos20.entity.RolesEntity;
import com.mendezIndepth.contratos20.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    UserEntity findByEmail(String email);

    List<UserEntity> findByRoles(RolesEntity role);
}
