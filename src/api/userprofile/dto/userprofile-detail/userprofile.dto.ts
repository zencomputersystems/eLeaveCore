import { UserPersonalDetailDTO } from './personal-detail/user-personal-detail.dto';
import { EmploymentDetailDTO } from './employment-detail/employment-detail.dto';
import { EntitlementDetailDTO } from './entitlement-detail/entitlement-detail.dto';
import { CertificationDetailDTO } from './certification-detail/certificationDetail.dto';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for user profile
 *
 * @export
 * @class UserProfileDTO
 */
export class UserProfileDTO {
    /**
     * Data user profile - id
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    id: string;

    /**
     * Data user profile - user id
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    userId: string;

    /**
     * Data user profile - calendar id
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    calendarId: string;

    /**
     * Role id
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    roleId: string;

    /**
     * Working hours id
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    workingHoursId: string;

    /**
     * Data user profile - tenant id
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    tenantId: string;

    /**
     * Data user profile - employee name
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    employeeName: string;

    /**
     * Data user profile - employee designation
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    employeeDesignation: string;

    /**
     * Data user profile - employee location
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    employeeLocation: string;

    /**
     * Data user profile - employee department
     *
     * @type {string}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    employeeDepartment: string;

    /**
     * Data user profile - personal detail
     *
     * @type {UserPersonalDetailDTO}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty({ type: UserPersonalDetailDTO })
    personalDetail: UserPersonalDetailDTO;

    /**
     * Data user profile - employment detail
     *
     * @type {EmploymentDetailDTO}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty({ type: EmploymentDetailDTO })
    employmentDetail: EmploymentDetailDTO;

    /**
     * Data user profile - award certification
     *
     * @type {*}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    awardCertification: any;

    /**
     * Data user profile - entitlement detail
     *
     * @type {*}
     * @memberof UserProfileDTO
     */
    @ApiModelProperty()
    entitlementDetail: any;

}