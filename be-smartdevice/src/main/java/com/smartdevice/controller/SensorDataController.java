package com.smartdevice.controller;

import com.smartdevice.dto.BasePageResponse;
import com.smartdevice.dto.ModelSearch;
import com.smartdevice.model.SensorData;
import com.smartdevice.service.SensorDataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sensor-data")
@Tag(name = "Sensor Data Controller", description = "Quản lý dữ liệu thiết bị cảm biến")
public class SensorDataController {
    private final SensorDataService sensorDataService;

    @Operation(summary = "Lấy danh sách dữ liệu thiết bị cảm biến theo schema ModelSearch",
            description = "API này trả về danh sách dữ liệu thiết bị cảm biến với schema SensorData"
    )
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

    @Operation(summary = "Tạo bản ghi dữ liệu thiết bị cảm biến theo schema SensorData",
            description = "API không trả về giá trị")
    @PostMapping
    public ResponseEntity<?> createSensorData(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Thông tin dữ liệu cảm biến cần tạo gồm nhiệt độ, độ ẩm, ánh sáng",
                    required = true
            )
            @RequestBody SensorData sensorData){
        sensorDataService.createSensorData(sensorData);
        return ResponseEntity.ok().build();
    }
}
