import { Injectable, HttpService } from '@nestjs/common';
import { DreamFactory } from 'src/config/dreamfactory';
import { Observable } from 'rxjs';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Resource } from 'src/common/model/resource.model';
import { UserInfoModel } from './model/user-info.model';
import { v1 } from 'uuid';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserInfoService {
    private table_name = "user_info";
    private db_host = DreamFactory.df_host+this.table_name;

    constructor(private readonly httpService: HttpService, private readonly queryService: QueryParserService){}

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

        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);

        return this.httpService.get(url);

    }

    //create new leavetype entitlement
    create(user: any, d: CreateUserDTO) {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);
        const data = this.mapData(d,user.USER_GUID);
        
        data.USER_INFO_GUID = v1();
        data.CREATION_TS = new Date().toISOString();

        resource.resource.push(data);
        console.log(resource);
        //return this.httpService.post(this.queryService.generateDbQuery(this.table_name,[],[]),resource);
        
    }

    update(user: any, d: UpdateUserDTO) {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);
        const data = this.mapData(d,user.USER_GUID);
        
        data.USER_INFO_GUID = d.id;
       
        resource.resource.push(data);
        console.log(resource);
        return this.httpService.patch(this.queryService.generateDbQuery(this.table_name,[],[]),resource);
        
    }

    private mapData(d:any,userId: string) {
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

        data.XML = "";
           
        return data;
    }
}
