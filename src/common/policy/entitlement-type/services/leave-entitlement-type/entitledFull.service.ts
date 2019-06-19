import { LeaveEntitlementBaseService } from './leave-entitlement-base.service';
import { ILeaveEntitlementType } from '../../interface/iLeaveEntitlementType';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { Injectable } from '@nestjs/common';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';

@Injectable()
export class EntitledFullService extends LeaveEntitlementBaseService implements ILeaveEntitlementType {

    constructor(private readonly xmlParserService: XMLParserService) {
        super();
    }

    /*
        Full entitlement
    */
    calculateEntitledLeave(date: Date, yearOfService: number, leavePolicy: LeaveTypePropertiesXmlDTO): number {

        // Convert xml to json
        //const policyJson = this.xmlParserService.convertXMLToJson(leavePolicy);

        return this.getEntitlementFromPolicy(leavePolicy, yearOfService);

    }

}