package com.example;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseUtils {
    private static final String URL = "jdbc:postgresql://localhost:5432/disaster_db";
    private static final String USER = "user";
    private static final String PASSWORD = "password";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public static void createVolunteer(String name, String skills) throws SQLException {
        String query = "INSERT INTO Volunteers (name, skills) VALUES (?, ?)";
        try (Connection connection = getConnection();
            PreparedStatement pstmt = connection.prepareStatement(query)) {
            pstmt.setString(1, name);
            pstmt.setString(2, skills);
            pstmt.executeUpdate();
        }
    }

    public static void readVolunteers() throws SQLException {
        String query = "SELECT * FROM Volunteers";
        try (Connection connection = getConnection();
            PreparedStatement pstmt = connection.prepareStatement(query);
            ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                System.out.println("Volunteer: " + rs.getString("name") + ", Skills: " + rs.getString("skills"));
            }
        }
    }

    public static void updateVolunteer(int id, String name, String skills) throws SQLException {
        String query = "UPDATE Volunteers SET name = ?, skills = ? WHERE id = ?";
        try (Connection connection = getConnection();
            PreparedStatement pstmt = connection.prepareStatement(query)) {
            pstmt.setString(1, name);
            pstmt.setString(2, skills);
            pstmt.setInt(3, id);
            pstmt.executeUpdate();
        }
    }

    public static void deleteVolunteer(int id) throws SQLException {
        String query = "DELETE FROM Volunteers WHERE id = ?";
        try (Connection connection = getConnection();
            PreparedStatement pstmt = connection.prepareStatement(query)) {
            pstmt.setInt(1, id);
            pstmt.executeUpdate();
        }
    }
}

