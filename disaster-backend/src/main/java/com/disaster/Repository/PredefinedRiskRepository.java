package com.disaster.Repository;


import com.disaster.models.PredefinedRisk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredefinedRiskRepository extends JpaRepository<PredefinedRisk, Long> {
    PredefinedRisk findByType(String type);
}
