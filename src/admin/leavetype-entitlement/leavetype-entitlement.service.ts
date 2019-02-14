import { Injectable, HttpService } from '@nestjs/common';
import {j2xParser} from 'fast-xml-parser';
import { Resource } from 'src/common/model/resource.model';
import { LeaveTypeEntitlementModel } from './model/leavetype_entitlement.model';
import { CreateLeaveEntitlementTypeDto } from './dto/create-leavetype_entitlement.dto';
import { v1 } from 'uuid';
import { Observable } from 'rxjs';
import { DreamFactory } from 'src/config/dreamfactory';
import { UpdateLeaveTypeEntitlementDto } from './dto/update-leavetype_entitlement.dto';

@Injectable()
export class LeavetypeEntitlementService {
    private table_name = "l_leavetype_entitlement_def";
    private db_host = DreamFactory.df_host+this.table_name;

    constructor(private readonly httpService: HttpService){}

    private convertJsonToXML(data:any) {
        var defaultOptions = {
            attributeNamePrefix : "@_",
            attrNodeName: "@", //default is false
            textNodeName : "#text",
            ignoreAttributes : true,
            cdataTagName: "__cdata", //default is false
            cdataPositionChar: "\\c",
            format: false,
            indentBy: "  ",
            supressEmptyNode: false
        };

        const converter = new j2xParser(defaultOptions);

        return converter.parse(data);
    }

    //find all tenant leave definition
    public findAll(userid: string, tenantid:string): Observable<any> {
console.log(this.db_host);
        //url
        const url = this.db_host+"?filter=TENANT_GUID="+tenantid;
 
        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find tenant leave definition by id
    public findById(userid: string, tenantid:string, id: string): Observable<any> {
        //url
        const url = this.db_host+"?fields=ENTITLEMENT_GUID%2CCODE%2CDESCRIPTION%2CPROPERTIES_XML&filter=(ENTITLEMENT_GUID="+id+")AND(TENANT_GUID="+tenantid+")";
        
        //call DF to validate the user
        return this.httpService.get(url);
    }

    //create new leavetype entitlement
    create(user: any, d: CreateLeaveEntitlementTypeDto): Observable<any> {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);
        const data = new LeaveTypeEntitlementModel();
        
        data.CODE = d.code;
        data.DESCRIPTION = d.description;
        data.PROPERTIES_XML = this.convertJsonToXML(d.properties);

        data.ENTITLEMENT_GUID = v1();
        data.LEAVE_TYPE_GUID = d.leavetype_id;
        data.TENANT_GUID = user.TENANT_GUID;
        data.TENANT_COMPANY_GUID = "323bdfa7-eed2-8bf2-2274-b1cd9390c9ca";
        data.CREATION_TS = new Date().toISOString();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;
        

        resource.resource.push(data);

        return this.httpService.post(this.db_host,resource);
        
    }

    //update new leavetype entitlement
    update(user: any, d: UpdateLeaveTypeEntitlementDto): Observable<any> {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);
        const data = new LeaveTypeEntitlementModel();
        
        data.ENTITLEMENT_GUID = d.id;
        data.TENANT_GUID = user.TENANT_GUID;
        data.CODE = d.code;
        data.DESCRIPTION = d.description;
        data.PROPERTIES_XML = this.convertJsonToXML(d.properties);
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;
        
        resource.resource.push(data);
        
        const url = this.db_host+"?id_field=TENANT_GUID%2CENTITLEMENT_GUID";

        return this.httpService.patch(url,resource);
        
    }


}
