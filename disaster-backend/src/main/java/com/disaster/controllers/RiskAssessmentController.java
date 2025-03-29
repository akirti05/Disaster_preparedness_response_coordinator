package com.disaster.controllers;


import com.disaster.models.PredefinedRisk;
import com.disaster.models.RiskAssessment;
import com.disaster.Repository.PredefinedRiskRepository;
import com.disaster.Repository.RiskAssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risk")
@CrossOrigin(origins = "*")
public class RiskAssessmentController {

    @Autowired
    private PredefinedRiskRepository predefinedRiskRepository;

    @Autowired
    private RiskAssessmentRepository riskAssessmentRepository;

    @GetMapping
    public List<PredefinedRisk> getAllRisks() {
        return predefinedRiskRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<RiskAssessment> createRiskAssessment(@RequestBody RiskAssessment riskAssessment) {
        PredefinedRisk predefinedRisk = predefinedRiskRepository.findByType(riskAssessment.getPredefinedRisk().getType());
        if (predefinedRisk == null) {
            return ResponseEntity.badRequest().build();
        }
        riskAssessment.setPredefinedRisk(predefinedRisk);
        RiskAssessment savedAssessment = riskAssessmentRepository.save(riskAssessment);
        return ResponseEntity.ok(savedAssessment);
    }
   
        

    @GetMapping("/assessments")
    public List<RiskAssessment> getAllAssessments() {
        return riskAssessmentRepository.findAll();
    }
}
