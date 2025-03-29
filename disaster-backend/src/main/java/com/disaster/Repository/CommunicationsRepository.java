package com.disaster.Repository;



import com.disaster.models.Communications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunicationsRepository extends JpaRepository<Communications, Long> {
}
