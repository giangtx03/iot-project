package com.smartdevice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceHistoryDto {
    @Schema(example = "fan")
    @NotBlank
    private String name;

    @NotBlank
    @Schema(example = "true")
    private boolean action;
}
