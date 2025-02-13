package com.smartdevice.repository;

import com.smartdevice.model.DeviceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceHistoryRepo extends JpaRepository<DeviceHistory, Long> {
}
