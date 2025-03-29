package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        // Example to show Object-Oriented Programming principles
        RiskAssessment risk = new RiskAssessment();
        risk.assessRisk("Flood");
        risk.assessRisk("Earthquake");
        risk.updateRiskFactor("Flood", 8);
        risk.assessRisk("Flood");

        // Example to show Collections usage
        List<String> volunteers = new ArrayList<>();
        volunteers.add("John Doe");
        volunteers.add("Jane Smith");
        System.out.println("Volunteers: " + volunteers);

        // Example to show Regular Expressions
        String email = "example@example.com";
        Pattern pattern = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
        Matcher matcher = pattern.matcher(email);
        if (matcher.matches()) {
            System.out.println("Valid email address.");
        } else {
            System.out.println("Invalid email address.");
        }

        // JDBC Example (simplified)
        try {
            Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/disaster_db", "user", "password");
            PreparedStatement pstmt = connection.prepareStatement("SELECT * FROM Volunteers");
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                System.out.println("Volunteer: " + rs.getString("name"));
            }
            rs.close();
            pstmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
    }
}
