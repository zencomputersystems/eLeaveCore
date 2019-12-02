import { LeaveEntitlementBaseService } from './leave-entitlement-base.service';
import { ILeaveEntitlementType } from '../../interface/iLeaveEntitlementType';
import { Injectable } from '@nestjs/common';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';

/** XMLparser from zen library  */
var { convertXMLToJson, convertJsonToXML } = require('@zencloudservices/xmlparser');

/**
 * Service entitled full service
 *
 * @export
 * @class EntitledFullService
 * @extends {LeaveEntitlementBaseService}
 * @implements {ILeaveEntitlementType}
 */
@Injectable()
export class EntitledFullService extends LeaveEntitlementBaseService implements ILeaveEntitlementType {

    /**
     *Creates an instance of EntitledFullService.
     * @memberof EntitledFullService
     */
    constructor() {
        super();
    }

    /*
        Full entitlement
    */
    /**
     * Full entitlement
     *
     * @param {Date} date
     * @param {number} yearOfService
     * @param {LeaveTypePropertiesXmlDTO} leavePolicy
     * @returns {number}
     * @memberof EntitledFullService
     */
    calculateEntitledLeave(date: Date, yearOfService: number, leavePolicy: LeaveTypePropertiesXmlDTO): number {

        // Convert xml to json
        //const policyJson = convertXMLToJson(leavePolicy);

        return this.getEntitlementFromPolicy(leavePolicy, yearOfService);

    }

}