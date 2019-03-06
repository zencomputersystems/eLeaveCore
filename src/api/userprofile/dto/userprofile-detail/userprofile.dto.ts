import { UserPersonalDetailDTO } from "./personal-detail/user-personal-detail.dto";
import { EmploymentDetailDTO } from "./employment-detail/employment-detail.dto";
import { EntitlementDetailDTO } from "./entitlement-detail/entitlement-detail.dto";
import { CertificationDetailDTO } from "./certification-detail/certificationDetail.dto";

export class UserProfileDTO {
    id: string;
    userId: string;
    employeeName: string;
    employeeDesignation: string;
    employeeLocation: string;
    personalDetail: UserPersonalDetailDTO;
    employmentDetail: EmploymentDetailDTO;
    awardCertification = new Array<CertificationDetailDTO>();
    entitlementDetail: any;

}