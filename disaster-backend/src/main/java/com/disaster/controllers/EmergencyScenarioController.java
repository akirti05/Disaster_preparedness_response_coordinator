package com.disaster.controllers;


import com.disaster.models.EmergencyScenario;
import com.disaster.Repository.EmergencyScenarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency-scenarios")
@CrossOrigin(origins = "*")
public class EmergencyScenarioController {

    @Autowired
    private EmergencyScenarioRepository emergencyScenarioRepository;

    @GetMapping
    public List<EmergencyScenario> getAllEmergencyScenarios() {
        return emergencyScenarioRepository.findAll();
    }

    @PostMapping
    public EmergencyScenario createEmergencyScenario(@RequestBody EmergencyScenario emergencyScenario) {
        return emergencyScenarioRepository.save(emergencyScenario);
    }
}
