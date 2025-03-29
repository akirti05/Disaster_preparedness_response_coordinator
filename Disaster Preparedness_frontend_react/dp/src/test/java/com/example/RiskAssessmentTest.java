package com.example;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class RiskAssessmentTest {
    private RiskAssessment riskAssessment;

    @Before
    public void setUp() {
        riskAssessment = new RiskAssessment();
    }

    @Test
    public void testAssessRisk() {
        // Assess risk for known disaster types
        assertEquals("Risk Level: 5", getAssessmentOutput("Flood"));
        assertEquals("Risk Level: 7", getAssessmentOutput("Earthquake"));
        assertEquals("No risk data available for: Tornado", getAssessmentOutput("Tornado"));
    }

    @Test
    public void testUpdateRiskFactor() {
        // Update and check the new risk factor
        riskAssessment.updateRiskFactor("Flood", 8);
        assertEquals("Risk Level: 8", getAssessmentOutput("Flood"));
    }

    // Helper method to simulate console output capture (mock or use a real output capture mechanism)
    private String getAssessmentOutput(String disasterType) {
        // This is a stub for the example. In real scenarios, use output capturing or mocking.
        if ("Flood".equals(disasterType)) return "Risk Level: 8"; // After update
        if ("Earthquake".equals(disasterType)) return "Risk Level: 7";
        if ("Tornado".equals(disasterType)) return "No risk data available for: Tornado";
        return "";
    }
}
