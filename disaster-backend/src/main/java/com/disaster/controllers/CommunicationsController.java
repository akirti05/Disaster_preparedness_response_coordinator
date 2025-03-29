package com.disaster.controllers;

                                                                                        
import com.disaster.models.Communications;                                               
import com.disaster.Repository.CommunicationsRepository;                               
import org.springframework.beans.factory.annotation.Autowired;                          
import org.springframework.web.bind.annotation.*;                                       
                                                                                        
import java.util.List;                                                                  
                                                                                        
@RestController                                                                         
@RequestMapping("/api/communications")   
@CrossOrigin(origins = "*")
public class CommunicationsController {                                                  
                                                                                        
    @Autowired                                                                          
    private CommunicationsRepository communicationRepository;                            
                                                                                         
    @GetMapping                                                                         
    public List<Communications> getAllCommunications() {                                  
        return communicationRepository.findAll();                                        
    }                                                                                    
                                                                                         
    @PostMapping                                                                        
    public Communications createCommunication(@RequestBody Communications communication) { 
        return communicationRepository.save(communication);                              
    }                                                                                    
}                                                                                        
                                                                                         

 
 
 
 
 

 
 
 
 
 

 
 
 
 
 
 
 
 
 
 

 
 
 
 
 
 
 
 

