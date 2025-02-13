package com.smartdevice.repository;

import com.smartdevice.model.DeviceHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DeviceHistoryRepo extends JpaRepository<DeviceHistory, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM device_history " +
            "WHERE id = :keyword " +
            "OR name LIKE CONCAT('%', :keyword, '%') " +
            "OR action LIKE CONCAT('%', :keyword, '%') " +
            "OR time = :keyword",
            countQuery = "SELECT COUNT(*) FROM device_history " +
                    "WHERE id = :keyword " +
                    "OR name LIKE CONCAT('%', :keyword, '%') " +
                    "OR action LIKE CONCAT('%', :keyword, '%') " +
                    "OR time = :keyword")
    Page<DeviceHistory> findAllDeviceHistory(@Param("keyword") String keyword, Pageable pageable);


}
