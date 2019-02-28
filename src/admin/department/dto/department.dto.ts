import { ApiModelProperty } from "@nestjs/swagger";

import { IsNotEmpty } from "class-validator";

export class DepartmentDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;
}