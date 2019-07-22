import { Injectable, HttpService, NotFoundException } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable, pipe, of, forkJoin } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { CompanyModel } from './model/company.model';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { map, mergeMap } from 'rxjs/operators';
import { DepartmentDbService } from '../department/db/department.db.service';
import { CompanyDTO } from './dto/company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { CompanySiteModel } from './model/company-site.model';
import { CreateCompanySiteDTO } from './dto/create-company-site.dto';
import { UpdateCompanySiteDTO } from './dto/update-company-site.dto';

/**
 * Service for company site 
 *
 * @export
 * @class CompanySiteService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class CompanySiteService extends BaseDBService implements IDbService {

    /**
     * Declare tablename
     *
     * @private
     * @memberof CompanySiteService
     */
    private _tableName = "tenant_company_site";

    /**
     *Creates an instance of CompanySiteService.
     * @param {HttpService} httpService http service
     * @param {QueryParserService} queryService query service
     * @param {CommonFunctionService} commonFunctionService common function service
     * @memberof CompanySiteService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        public readonly commonFunctionService: CommonFunctionService) {
        super(httpService, queryService, "tenant_company_site");
    }

    /**
     * find all company site
     *
     * @param {string} TENANT_GUID
     * @returns {Observable<any>}
     * @memberof CompanySiteService
     */
    public findAll(TENANT_GUID: string): Observable<any> {
        const fields = [];
        let result = this.commonFunctionService.findAllList(fields, TENANT_GUID, this.queryService, this.httpService, this._tableName);
        return this.commonFunctionService.getListData(result);
    }

    /**
     * filter company site by company
     *
     * @param {*} TENANT_GUID
     * @param {string} id
     * @returns {Observable<any>}
     * @memberof CompanySiteService
     */
    public findById(TENANT_GUID: any, id: string): Observable<any> {
        const fields = [];
        // console.log(id+' - '+TENANT_GUID);
        // if(id == undefined) { throw new NotFoundException('Company id not found'); }
        const filters = ['(TENANT_COMPANY_GUID=' + id + ')', '(TENANT_GUID=' + TENANT_GUID + ')'];
        const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);
        return this.httpService.get(url);
    }

    /**
     * create new company site
     *
     * @param {*} user
     * @param {CreateCompanySiteDTO} d
     * @returns
     * @memberof CompanySiteService
     */
    create(user: any, d: CreateCompanySiteDTO) {

        const resource = new Resource(new Array);
        const data = new CompanySiteModel();

        data.TENANT_COMPANY_SITE_GUID = v1();
        data.TENANT_COMPANY_GUID = d.companyId;
        data.SITE_NAME = d.siteName;
        data.REGISTRATION_NO = d.registrationNo;
        data.ADDRESS = d.address;
        data.ADDRESS2 = d.address2;
        data.ADDRESS3 = d.address3;
        data.CONTACT_NO = d.contactNo;
        data.EMAIL = d.email;
        data.ACTIVATION_FLAG = 1;
        data.CONTACT_PERSON = d.contactPersonName;
        data.CONTACT_PERSON_CONTACT_NO = d.contactPersonContactNo;
        data.CONTACT_PERSON_EMAIL = d.contactPersonEmail;
        data.WEBSITE = d.website;
        data.CREATION_TS = new Date().toISOString();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.ISHQ = d.isHQ;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        return this.createByModel(resource, [], [], []);

    }

    /**
     * update company site
     *
     * @param {*} user
     * @param {UpdateCompanySiteDTO} d
     * @returns
     * @memberof CompanySiteService
     */
    update(user: any, d: UpdateCompanySiteDTO) {

        const resource = new Resource(new Array);
        const data = new CompanySiteModel();

        data.TENANT_COMPANY_SITE_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.SITE_NAME = d.data.siteName;

        data.TENANT_COMPANY_GUID = d.data.companyId;
        data.REGISTRATION_NO = d.data.registrationNo;
        data.ADDRESS = d.data.address;
        data.ADDRESS2 = d.data.address2;
        data.ADDRESS3 = d.data.address3;
        data.CONTACT_NO = d.data.contactNo;
        data.EMAIL = d.data.email;
        data.CONTACT_PERSON = d.data.contactPersonName;
        data.CONTACT_PERSON_CONTACT_NO = d.data.contactPersonContactNo;
        data.CONTACT_PERSON_EMAIL = d.data.contactPersonEmail;
        data.WEBSITE = d.data.website;
        data.ISHQ = d.data.isHQ;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        return this.updateByModel(resource, [], [], []);
    }

}
