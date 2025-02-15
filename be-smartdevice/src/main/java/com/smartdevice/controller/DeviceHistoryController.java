package com.smartdevice.controller;

import com.smartdevice.dto.BasePageResponse;
import com.smartdevice.dto.ModelSearch;
import com.smartdevice.model.DeviceHistory;
import com.smartdevice.service.DeviceHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/device-history")
@Tag(name = "Device History Controller", description = "Quản lý lịch sử hoạt động thiết bị")
public class DeviceHistoryController {
    private final DeviceHistoryService deviceHistoryService;

    @Operation(summary = "Lấy danh sách lịch sử hoạt động thiết bị theo schema ModelSearch",
        description = "API này trả về danh sách lịch sử thiết bị với schema DeviceHistory"
    )
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

    @Operation(summary = "Lấy danh sách lịch sử hoạt động gần nhất từng thiết bị",
            description = "API này trả về danh sách lịch sử thiết bị với schema DeviceHistory"
    )

    @GetMapping("/distinct-devices")
    public ResponseEntity<?> getActionDevices(){
        List<DeviceHistory> deviceHistoryList = deviceHistoryService.getActionDevices();
        BasePageResponse response = BasePageResponse.builder()
                .httpCode(200)
                .message("Danh sách hoạt động của từng thiết bị")
                .data(deviceHistoryList)
                .build();
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Tạo bản ghi lịch sử hoạt động thiết bị theo schema DeviceHistory",
            description = "API không trả về giá trị")
    @PostMapping
    public ResponseEntity<?> createDeviceHistory(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Thông tin lịch sử hoạt động thiết bị cần tạo gồm tên thiết bị, hoạt động",
                    required = true
            )
            @RequestBody DeviceHistory deviceHistory){
        deviceHistoryService.createDeviceHistory(deviceHistory);
        return ResponseEntity.ok().build();
    }
}
