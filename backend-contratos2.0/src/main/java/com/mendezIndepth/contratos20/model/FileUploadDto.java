package com.mendezIndepth.contratos20.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileUploadDto {

    private Integer id;
    private String fileName;
    private Integer contractId;
}
