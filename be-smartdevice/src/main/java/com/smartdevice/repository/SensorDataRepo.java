package com.smartdevice.repository;

import com.smartdevice.model.SensorData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SensorDataRepo extends JpaRepository<SensorData, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM sensor_data " +
            "WHERE (:keyword IS NULL OR " +
            "    (:type = 'all' AND (" +
            "        id LIKE CONCAT('%', :keyword, '%') OR " +
            "        temperature LIKE CONCAT('%', :keyword, '%') OR " +
            "        humidity LIKE CONCAT('%', :keyword, '%') OR " +
            "        light_level LIKE CONCAT('%', :keyword, '%') OR " +
            "        time LIKE CONCAT('%', :keyword, '%')" +
            "    )) OR " +
            "    (:type <> 'all' AND (" +
            "        (:type = 'id' AND id LIKE CONCAT('%', :keyword, '%')) OR " +
            "        (:type = 'temperature' AND temperature LIKE CONCAT('%', :keyword, '%')) OR " +
            "        (:type = 'humidity' AND humidity LIKE CONCAT('%', :keyword, '%')) OR " +
            "        (:type = 'light_level' AND light_level LIKE CONCAT('%', :keyword, '%')) OR " +
            "        (:type = 'time' AND time LIKE CONCAT('%', :keyword, '%'))" +
            "    )) " +
            ")",
            countQuery = "SELECT COUNT(*) FROM sensor_data " +
                    "WHERE (:keyword IS NULL OR " +
                    "    (:type = 'all' AND (" +
                    "        id LIKE CONCAT('%', :keyword, '%') OR " +
                    "        temperature LIKE CONCAT('%', :keyword, '%') OR " +
                    "        humidity LIKE CONCAT('%', :keyword, '%') OR " +
                    "        light_level LIKE CONCAT('%', :keyword, '%') OR " +
                    "        time LIKE CONCAT('%', :keyword, '%')" +
                    "    )) OR " +
                    "    (:type <> 'all' AND (" +
                    "        (:type = 'id' AND id LIKE CONCAT('%', :keyword, '%')) OR " +
                    "        (:type = 'temperature' AND temperature LIKE CONCAT('%', :keyword, '%')) OR " +
                    "        (:type = 'humidity' AND humidity LIKE CONCAT('%', :keyword, '%')) OR " +
                    "        (:type = 'light_level' AND light_level LIKE CONCAT('%', :keyword, '%')) OR " +
                    "        (:type = 'time' AND time LIKE CONCAT('%', :keyword, '%'))" +
                    "    )) " +
                    ")")
    Page<SensorData> findAllSensorData(@Param("type") String type,
                                       @Param("keyword") String keyword,
                                       Pageable pageable);



}
