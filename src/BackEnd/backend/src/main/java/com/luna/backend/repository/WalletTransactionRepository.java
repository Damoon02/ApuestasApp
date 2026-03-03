package com.luna.backend.repository;

import com.luna.backend.model.WalletTransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransactionEntity, Long> {

    @Query("select coalesce(sum(t.amount), 0) from WalletTransactionEntity t where t.user.id = :userId")
    BigDecimal balanceOf(Long userId);

    List<WalletTransactionEntity> findTop20ByUserIdOrderByCreatedAtDesc(Long userId);
}