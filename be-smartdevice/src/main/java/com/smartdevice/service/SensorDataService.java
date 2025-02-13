package com.smartdevice.service;

import com.smartdevice.dto.ModelSearch;
import com.smartdevice.model.SensorData;
import com.smartdevice.repository.SensorDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SensorDataService {
    private final SensorDataRepo sensorDataRepo;

    public Page<SensorData> getAllSensorData(ModelSearch modelSearch) {
        Sort sort = modelSearch.getSortOrder().equalsIgnoreCase("asc")
                ? Sort.by(modelSearch.getSortBy()).ascending()
                : Sort.by(modelSearch.getSortBy()).descending();

        PageRequest pageable = PageRequest.of(modelSearch.getPageNumber() - 1, modelSearch.getPageSize(), sort);

        Page<SensorData> sensorDataPage = sensorDataRepo.findAllSensorData(modelSearch.getType(),modelSearch.getKeyword(), pageable);

        return sensorDataPage;
    }

    public void createSensorData(SensorData sensorData) {
        sensorData.setTime(LocalDateTime.now());
        sensorDataRepo.save(sensorData);
    }
}
