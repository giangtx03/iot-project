package com.smartdevice.controller;

import com.smartdevice.dto.BasePageResponse;
import com.smartdevice.dto.ModelSearch;
import com.smartdevice.model.SensorData;
import com.smartdevice.service.SensorDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sensor_data")
public class SensorDataController {
    private final SensorDataService sensorDataService;

    @GetMapping
    public ResponseEntity<?> getAllSensorData(@ModelAttribute ModelSearch modelSearch){

        Page<SensorData> sensorDataPage =  sensorDataService.getAllSensorData(modelSearch);
        BasePageResponse response = BasePageResponse.builder()
                .httpCode(200)
                .message("Danh sách dữ liệu cảm biến")
                .data(sensorDataPage.getContent())
                .totalPages(sensorDataPage.getTotalPages())
                .totalItems(sensorDataPage.getTotalElements())
                .build();
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> createSensorData(@RequestBody SensorData sensorData){
        sensorDataService.createSensorData(sensorData);
        return ResponseEntity.ok().build();
    }
}
