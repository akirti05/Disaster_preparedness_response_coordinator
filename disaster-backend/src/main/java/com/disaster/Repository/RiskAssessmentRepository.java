package com.disaster.Repository;

import com.disaster.models.RiskAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RiskAssessmentRepository extends JpaRepository<RiskAssessment, Long> {
}
