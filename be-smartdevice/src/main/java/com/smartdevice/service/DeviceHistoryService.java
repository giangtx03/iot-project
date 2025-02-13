package com.smartdevice.service;

import com.smartdevice.repository.DeviceHistoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeviceHistoryService {
    private final DeviceHistoryRepo deviceHistoryRepo;
}
