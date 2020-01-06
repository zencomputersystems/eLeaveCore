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
     * @param {*} element
     * @param {Access} accessData
     * @memberof UserprofileListDTO
     */
    constructor(element: any, accessData: Access) {
        this.id = element.USER_INFO_GUID;
        this.userId = element.USER_GUID;
        this.staffNumber = element.STAFF_ID == null ? '' : element.STAFF_ID;
        this.employeeName = element.FULLNAME;
        this.designation = element.DESIGNATION;
        this.department = element.DEPARTMENT;
        this.costcentre = element.COSTCENTRE;
        this.branch = element.BRANCH;
        this.companyId = element.TENANT_COMPANY_GUID;
        this.email = element.EMAIL;
        this.status = element.ACTIVATION_FLAG == 1 ? 'Active' : 'Inactive';
        this.statusInvite = element.STATUS_ACTIVATION;
        this.access = accessData;
    }

    /**
     * Data userprofilelist - id
     *
     * @type {string} 
     * @memberof UserprofileListDTO
     */
    public id: string;
    /**
     * Data userprofilelist - user id
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public userId: string;
    /**
     * Data userprofilelist - staffname
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public staffNumber: string;
    /**
     * Data userprofilelist - employee name
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public employeeName: string;
    /**
     * Data userprofilelist - designation
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public designation: string;
    /**
     * Data userprofilelist - department
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public department: string;
    /**
     * Data userprofilelist - costcentre
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public costcentre: string;
    /**
     * Data userprofilelist - branch
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public branch: string;
    /**
     * Data userprofilelist - company id
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public companyId: string;
    /**
     * Data userprofilelist - email
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public email: string;
    /**
     * Data userprofilelist - status user
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public status: string;
    /**
     * Data userprofileList = status invitation
     *
     * @type {string}
     * @memberof UserprofileListDTO
     */
    public statusInvite: string;
    /**
     * Data userprofilelist - access
     *
     * @type {Access}
     * @memberof UserprofileListDTO
     */
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