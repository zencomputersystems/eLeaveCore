import { Injectable, HttpService } from '@nestjs/common';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserInfoModel } from './model/user-info.model';
import {j2xParser, parse} from 'fast-xml-parser';
import { UserDto } from './dto/user.dto';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';

@Injectable()
export class UserInfoService extends BaseDBService implements IDbService {

    private _tableName = "user_info";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        public readonly xmlParserService: XMLParserService){
            super(httpService,queryService,"user_info");
        }

    //find single user
    public findOne(userId: string, tenantId: string): Observable<any> {
        const fields = [
            'USER_INFO_GUID',
            'FULLNAME',
            'XML',
            'BRANCH',
            'DEPT_GUID',
            'DESIGNATION_GUID',
            'JOIN_DATE',
            'CONFIRMATION_DATE',
            'RESIGNATION_DATE',
            'EMPLOYEE_STATUS',
            'EMPLOYEE_TYPE'
        ];
        const filters = ['(USER_GUID='+userId+')'];

        const url = this.queryService.generateDbQuery(this._tableName,fields,filters);

        return this.httpService.get(url);

    }

    findAll(TENANT_GUID: string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    findById(USERINFO_GUID: any, id: string): Observable<any> {
        throw new Error("Method not implemented.");
    }

    //create new leavetype entitlement
    create(user: any, d: CreateUserDTO) {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);

        const data = this.mapData(d,user.USER_GUID);
        
        data.USER_INFO_GUID = v1();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.CREATION_TS = new Date().toISOString();

        resource.resource.push(data);

        return this.createByModel(resource,[],[],[]);
        
    }


    update(user: any, d: UpdateUserDTO) {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);
        const data = this.mapData(d,user.USER_GUID);
        
        data.USER_INFO_GUID = d.id;
       
        resource.resource.push(data);

        return this.updateByModel(resource,[],[],[]);        
    }

    public mapData(d:UserDto,userId: string) {
        const data = new UserInfoModel();
        
        data.USER_GUID = userId;

        data.DESIGNATION_GUID = d.employmentDetail.designationId;
        data.DEPT_GUID = d.employmentDetail.departmentId;
        data.BRANCH = d.employmentDetail.branchId;
        data.TENANT_COMPANY_GUID = d.employmentDetail.companyId;
        
        data.EMPLOYEE_TYPE = 1;
        data.FULLNAME = d.employeeName;
        data.JOIN_DATE = d.employmentDetail.joinDate;
        data.CONFIRMATION_DATE = d.employmentDetail.confirmationDate;
        data.RESIGNATION_DATE = d.employmentDetail.resignationDate;
        data.MANAGER_USER_GUID = d.employmentDetail.reportingToId;
        data.EMPLOYEE_STATUS = d.employmentDetail.employmentStatus;

        const xmldata = d;
        xmldata.employmentDetail = null;
        data.XML = this.xmlParserService.convertJsonToXML(xmldata);
           
        return data;
    }
}

