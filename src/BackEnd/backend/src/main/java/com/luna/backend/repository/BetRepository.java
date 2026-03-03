package com.luna.backend.repository;

import com.luna.backend.model.BetEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BetRepository extends JpaRepository<BetEntity, Long> {
    List<BetEntity> findByUserIdOrderByCreatedAtDesc(Long userId);
}