import { Access } from "src/common/dto/access.dto";

export class UserprofileListDTO {
    id: string; //userinfo GUID
    userId: string;
    staffId: string;
    employeeName: string;
    designation: string;
    email: string;

    // read = ProfileAdmin, ViewProfile
    // edit = ProfileAdmin, ViewProfile
    // delete = ProfileAdmin
    access = new Access();
}