package com.smartdevice.service;

import com.smartdevice.dto.ModelSearch;
import com.smartdevice.model.DeviceHistory;
import com.smartdevice.repository.DeviceHistoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class DeviceHistoryService {
    private final DeviceHistoryRepo deviceHistoryRepo;

    public Page<DeviceHistory> getAllDeviceHistory(ModelSearch modelSearch){

        Sort sort = modelSearch.getSortOrder().equalsIgnoreCase("asc")
                ? Sort.by(modelSearch.getSortBy()).ascending()
                : Sort.by(modelSearch.getSortBy()).descending();

        PageRequest pageable = PageRequest.of(modelSearch.getPageNumber() - 1, modelSearch.getPageSize(), sort);

        Page<DeviceHistory> deviceHistoryPage = deviceHistoryRepo.findAllDeviceHistory(modelSearch.getKeyword(), pageable);

        return deviceHistoryPage;
    }

    public void createDeviceHistory(DeviceHistory deviceHistory) {
        deviceHistory.setTime(LocalDateTime.now());
        deviceHistoryRepo.save(deviceHistory);
    }
}
