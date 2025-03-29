package com.disaster.controllers;

import com.disaster.Exception_Handling.ResourceNotFoundException;
import com.disaster.models.Volunteer;
import com.disaster.Repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@CrossOrigin(origins = "*")
public class VolunteerController {

    @Autowired
    private VolunteerRepository volunteerRepository;

    @GetMapping
    public ResponseEntity<List<Volunteer>> getAllVolunteers() {
        List<Volunteer> volunteers = volunteerRepository.findAll();
        return new ResponseEntity<>(volunteers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Volunteer> createVolunteer(@RequestBody Volunteer volunteer) {
        if (volunteer.getName() == null || volunteer.getName().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Handle missing name
        }
        Volunteer savedVolunteer = volunteerRepository.save(volunteer);
        return new ResponseEntity<>(savedVolunteer, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Volunteer> getVolunteerById(@PathVariable Long id) {
        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Volunteer not found with id: " + id));
        return new ResponseEntity<>(volunteer, HttpStatus.OK);
    }
}
