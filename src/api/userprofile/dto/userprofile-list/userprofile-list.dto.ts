import { Access } from "src/common/dto/access.dto";

/**
 *
 *
 * @export
 * @class UserprofileListDTO
 */
export class UserprofileListDTO {

    constructor(public id: string, public userId: string, public staffNumber: string, public employeeName: string, public designation: string, public email: string, public access: Access) {

    }
    // id: string; //userinfo GUID
    // userId: string;
    // staffId: string;
    // employeeName: string;
    // designation: string;
    // email: string;

    // // read = ProfileAdmin, ViewProfile
    // // edit = ProfileAdmin, ViewProfile
    // // delete = ProfileAdmin
    // access = new Access();

}