import { UserPersonalDetailDTO } from "./personal-detail/user-personal-detail.dto";
import { EmploymentDetailDTO } from "./employment-detail/employment-detail.dto";
import { EntitlementDetailDTO } from "./entitlement-detail/entitlement-detail.dto";
import { CertificationDetailDTO } from "./certification-detail/certificationDetail.dto";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
 *
 * @export
 * @class UserProfileDTO
 */
export class UserProfileDTO {
    @ApiModelProperty()
    id: string;

    @ApiModelProperty()
    userId: string;

    @ApiModelProperty()
    employeeName: string;

    @ApiModelProperty()
    employeeDesignation: string;

    @ApiModelProperty()
    employeeLocation: string;

    @ApiModelProperty()
    employeeDepartment: string;

    @ApiModelProperty({ type: UserPersonalDetailDTO })
    personalDetail: UserPersonalDetailDTO;

    @ApiModelProperty({ type: EmploymentDetailDTO })
    employmentDetail: EmploymentDetailDTO;

    @ApiModelProperty()
    awardCertification: any;

    @ApiModelProperty()
    entitlementDetail: any;

}