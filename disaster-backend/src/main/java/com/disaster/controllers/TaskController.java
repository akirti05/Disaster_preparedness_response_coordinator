package com.disaster.controllers;

import com.disaster.Exception_Handling.ResourceNotFoundException;
import com.disaster.models.Task;
import com.disaster.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @GetMapping("/volunteer/{volunteerId}")
    public List<Task> getTasksByVolunteerId(@PathVariable Long volunteerId) {
        return taskRepository.findByVolunteerId(volunteerId);
    }

    @PutMapping("/{id}")
    public Task updateTaskStatus(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        task.setStatus(taskDetails.getStatus());
        return taskRepository.save(task);
    }
}
