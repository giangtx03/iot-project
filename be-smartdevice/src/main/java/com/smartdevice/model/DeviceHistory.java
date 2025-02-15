package com.smartdevice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="device_history")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class DeviceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String name;
    @Column
    private boolean action;
    @Column
    private LocalDateTime time;
}
