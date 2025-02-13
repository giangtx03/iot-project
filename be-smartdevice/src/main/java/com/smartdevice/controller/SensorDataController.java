package com.smartdevice.controller;

import com.smartdevice.service.SensorDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sensor_data")
public class SensorDataController {
    private final SensorDataService sensorDataService;
}
