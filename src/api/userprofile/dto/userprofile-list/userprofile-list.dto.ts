import { Access } from "src/common/dto/access.dto";

/**
 * Data user profile list
 *
 * @export
 * @class UserprofileListDTO
 */
export class UserprofileListDTO {

    /**
     *Creates an instance of UserprofileListDTO.
     * @param {*} element
     * @param {Access} accessData
     * @memberof UserprofileListDTO
     */
    constructor(element: any, accessData: Access) {
        this.id = element.USER_INFO_GUID;
        this.userId = element.USER_GUID;
        this.staffNumber = element.PERSONAL_ID == null ? '' : element.PERSONAL_ID;
        this.employeeName = element.FULLNAME;
        this.designation = element.DESIGNATION;
        this.department = element.DEPARTMENT;
        this.email = element.EMAIL;
        this.access = accessData;
    }

    public id: string;
    public userId: string;
    public staffNumber: string;
    public employeeName: string;
    public designation: string;
    public department: string;
    public email: string;
    public access: Access;

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