import { CreateUpdateModel } from '../../../common/model/create-update.model';
/**
 * Entitlement claim model
 *
 * @export
 * @class EntitlementClaimModel
 * @extends {CreateUpdateModel}
 */
export class EntitlementClaimModel extends CreateUpdateModel {
  /**
   * Entitlement claim guid
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  ENTITLEMENT_CLAIM_GUID: string;
  /**
   * Tenant guid
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  TENANT_GUID: string;
  /**
   * User guid
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  USER_GUID: string;
  /**
   * Leavetype guid
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  LEAVE_TYPE_GUID: string;
  /**
   * Start date
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  START_DATE: string;
  /**
   * End date
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  END_DATE: string;
  /**
   * No. of days
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  NO_OF_DAYS: string;
  /**
   * Status
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  STATUS: string;
  /**
   * Request remarks
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  REQUEST_REMARKS: string;
  /**
   * Final request remarks
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  FINAL_REQUEST_REMARKS: string;
  /**
   * Deleted at
   *
   * @type {string}
   * @memberof EntitlementClaimModel
   */
  DELETED_AT: string;

}