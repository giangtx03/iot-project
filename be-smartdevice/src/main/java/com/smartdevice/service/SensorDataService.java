package com.smartdevice.service;

import com.smartdevice.repository.SensorDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SensorDataService {
    private final SensorDataRepo sensorDataRepo;
}
