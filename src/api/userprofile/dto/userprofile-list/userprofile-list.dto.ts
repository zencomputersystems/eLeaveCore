import { Access } from 'src/common/dto/access.dto';

/**
 * Data user profile list
 *
 * @export
 * @class UserprofileListDTO
 */
export class UserprofileListDTO {

    /**
     *Creates an instance of UserprofileListDTO.
     * @param {string} id
     * @param {string} userId
     * @param {string} staffNumber
     * @param {string} employeeName
     * @param {string} designation
     * @param {string} email
     * @param {Access} access
     * @memberof UserprofileListDTO
     */
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