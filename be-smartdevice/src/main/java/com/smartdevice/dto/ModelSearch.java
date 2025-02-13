package com.smartdevice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ModelSearch {
    private String keyword;
    private String type;
    private String sortBy;
    private String sortOrder;
    private int pageSize;
    private int pageNumber;
}
