package com.disaster.Repository;


import com.disaster.models.EmergencyScenario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyScenarioRepository extends JpaRepository<EmergencyScenario, Long> {
}
