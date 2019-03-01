import { Injectable, HttpService } from '@nestjs/common';
import {parse} from 'fast-xml-parser'; 
import { Resource } from 'src/common/model/resource.model';
import { LeaveTypeEntitlementModel } from './model/leavetype_entitlement.model';
import { CreateLeaveEntitlementTypeDto } from './dto/create-leavetype_entitlement.dto';
import { v1 } from 'uuid';
import { Observable } from 'rxjs';
import { UpdateLeaveTypeEntitlementDto } from './dto/update-leavetype_entitlement.dto';
import { map } from 'rxjs/operators';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';

@Injectable()
export class LeavetypeEntitlementService extends BaseDBService {
    private table_name = "l_leavetype_entitlement_def";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        private readonly xmlParserService: XMLParserService){
            super(httpService,queryService,"l_leavetype_entitlement_def");
        }


    //find all tenant leave definition
    public findAll(tenantid:string): Observable<any> {

        const filters = ['(TENANT_GUID='+tenantid+')'];
        //url
        const url = this.queryService.generateDbQueryV2(this.table_name,[],filters,[]);
 
        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find tenant leave definition by id
    public findById(tenantid:string, id: string): Observable<any> {
        
        const fields = ['ENTITLEMENT_GUID','CODE','DESCRIPTION','PROPERTIES_XML'];
        const filters = ['(ENTITLEMENT_GUID='+id+')','(TENANT_GUID='+tenantid+')'];
       
        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);


        //call DF to validate the user
        return this.httpService.get(url).pipe(map(d => {
            if(d.status==200)
            {
                d.data.resource.length>0?d.data.resource[0].PROPERTIES_XML=parse(d.data.resource[0].PROPERTIES_XML):'';
            }
            return d;
        }));
    }

    //create new leavetype entitlement
    create(user: any, d: CreateLeaveEntitlementTypeDto): Observable<any> {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);
        const data = new LeaveTypeEntitlementModel();
        
        data.CODE = d.code;
        data.DESCRIPTION = d.description;
        data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.properties);

        data.ENTITLEMENT_GUID = v1();
        data.LEAVE_TYPE_GUID = d.leavetype_id;
        data.TENANT_GUID = user.TENANT_GUID;
        data.TENANT_COMPANY_GUID = "323bdfa7-eed2-8bf2-2274-b1cd9390c9ca";
        data.CREATION_TS = new Date().toISOString();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;
        
        return this.createByModel(resource,[],[],[]);
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
        data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.properties);
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;
        
        resource.resource.push(data);

        return this.updateByModel(resource,[],[],[]);
        
    }


}
