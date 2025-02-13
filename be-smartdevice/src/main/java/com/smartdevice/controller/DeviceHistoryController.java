package com.smartdevice.controller;

import com.smartdevice.service.DeviceHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/device_history")
public class DeviceHistoryController {
    private final DeviceHistoryService deviceHistoryService;

}
