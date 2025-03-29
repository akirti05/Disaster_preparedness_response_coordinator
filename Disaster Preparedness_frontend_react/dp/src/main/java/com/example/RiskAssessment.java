package com.example;

import java.util.HashMap;
import java.util.Map;

public class RiskAssessment {
    private Map<String, Integer> riskFactors;

    // Constructor
    public RiskAssessment() {
        riskFactors = new HashMap<>();
        // Initialize with some example risk factors
        riskFactors.put("Flood", 5);
        riskFactors.put("Earthquake", 7);
        riskFactors.put("Fire", 6);
    }

    // Method to assess risk
    public void assessRisk(String disasterType) {
        System.out.println("Assessing risk for: " + disasterType);
        Integer riskLevel = riskFactors.get(disasterType);
        if (riskLevel != null) {
            System.out.println("Risk Level: " + riskLevel);
        } else {
            System.out.println("No risk data available for: " + disasterType);
        }
    }

    // Method to add or update risk factors
    public void updateRiskFactor(String disasterType, int riskLevel) {
        riskFactors.put(disasterType, riskLevel);
        System.out.println("Updated risk factor for " + disasterType + " to " + riskLevel);
    }
}
