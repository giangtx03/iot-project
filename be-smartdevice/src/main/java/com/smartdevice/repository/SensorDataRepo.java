package com.smartdevice.repository;

import com.smartdevice.model.SensorData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SensorDataRepo extends JpaRepository<SensorData, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM sensor_data " +
            "WHERE ( " +
            "    (:type = 'all' AND (id  = :keyword  " +
            "                        OR temperature  = :keyword  " +
            "                        OR humidity  = :keyword  " +
            "                        OR light_level  = :keyword  " +
            "                        OR time  = :keyword  )) " +
            "    OR " +
            "    (:type <> 'all' AND CAST(" +
            "        CASE " +
            "            WHEN :type = 'id' THEN id " +
            "            WHEN :type = 'temperature' THEN temperature " +
            "            WHEN :type = 'humidity' THEN humidity " +
            "            WHEN :type = 'light_level' THEN light_level " +
            "            WHEN :type = 'time' THEN time " +
            "        END AS CHAR)  = :keyword  " +
            "    ) " +
            ")",
            countQuery = "SELECT COUNT(*) FROM sensor_data " +
                    "WHERE ( " +
                    "    (:type = 'all' AND (id  = :keyword  " +
                    "                        OR temperature  = :keyword  " +
                    "                        OR humidity  = :keyword  " +
                    "                        OR light_level  = :keyword  " +
                    "                        OR time  = :keyword  )) " +
                    "    OR " +
                    "    (:type <> 'all' AND CAST(" +
                    "        CASE " +
                    "            WHEN :type = 'id' THEN id " +
                    "            WHEN :type = 'temperature' THEN temperature " +
                    "            WHEN :type = 'humidity' THEN humidity " +
                    "            WHEN :type = 'light_level' THEN light_level " +
                    "            WHEN :type = 'time' THEN time " +
                    "        END AS CHAR)  = :keyword  " +
                    "    ) " +
                    ")")
    Page<SensorData> findAllSensorData(@Param("type") String type,
                                       @Param("keyword") String keyword,
                                       Pageable pageable);


}
