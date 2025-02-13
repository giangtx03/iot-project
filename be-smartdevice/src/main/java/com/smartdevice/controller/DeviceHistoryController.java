package com.smartdevice.controller;

import com.smartdevice.dto.BasePageResponse;
import com.smartdevice.dto.ModelSearch;
import com.smartdevice.model.DeviceHistory;
import com.smartdevice.service.DeviceHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/device_history")
public class DeviceHistoryController {
    private final DeviceHistoryService deviceHistoryService;

    @GetMapping
    public ResponseEntity<?> getAllDeviceHistory(@ModelAttribute ModelSearch modelSearch){

        Page<DeviceHistory> deviceHistoryPage =  deviceHistoryService.getAllDeviceHistory(modelSearch);
        BasePageResponse response = BasePageResponse.builder()
                .httpCode(200)
                .message("Danh sách lịch sử hoạt động của thiết bị")
                .data(deviceHistoryPage.getContent())
                .totalPages(deviceHistoryPage.getTotalPages())
                .totalItems(deviceHistoryPage.getTotalElements())
                .build();
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> createDeviceHistory(@RequestBody DeviceHistory deviceHistory){
        deviceHistoryService.createDeviceHistory(deviceHistory);
        return ResponseEntity.ok().build();
    }
}
