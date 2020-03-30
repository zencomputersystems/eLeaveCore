import { MainItemReportDto } from './main-item-report.dto';

/**
 * Master list report dto
 *
 * @export
 * @class MasterListReportDto
 */
export class MasterListReportDto extends MainItemReportDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  userGuid: string;
  /**
   * Employee no
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  employeeNo: string;
  /**
   * Employee name
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  employeeName: string;
  /**
   * Designation
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  designation: string;
  /**
   * Email
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  email: string;
  /**
   * Approver
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  approver: string;
  /**
   * Join date
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  joinDate: string;
  /**
   * Confirm date
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  confirmDate: string;
  /**
   * Resign date
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  resignDate: string;
  /**
   * Status
   *
   * @type {string}
   * @memberof MasterListReportDto
   */
  status: string;
}