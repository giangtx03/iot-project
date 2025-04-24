package com.smartdevice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="sensor_data")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class SensorData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private int temperature;
    @Column
    private int humidity;
    @Column(name = "light_level")
    private int lightLevel;
    @Column(name = "wind_speed")
    private int windSpeed;
    @Column
    private LocalDateTime time;
}
