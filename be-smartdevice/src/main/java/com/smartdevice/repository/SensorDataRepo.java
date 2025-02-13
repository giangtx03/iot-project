package com.smartdevice.repository;

import com.smartdevice.model.SensorData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorDataRepo extends JpaRepository<SensorData, Long> {
}
