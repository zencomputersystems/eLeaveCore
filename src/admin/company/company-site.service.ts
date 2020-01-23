import { Injectable, HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { CompanySiteModel } from './model/company-site.model';
import { CreateCompanySiteDTO } from './dto/create-company-site.dto';
import { UpdateCompanySiteDTO } from './dto/update-company-site.dto';
import { setUpdateData, findAllList, getListData } from '../../common/helper/basic-functions';


/**
 * DB service for company site
 *
 * @export
 * @class CompanySiteDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class CompanySiteDbService extends BaseDBService implements IDbService {
    /**
     * Declare tablename
     *
     * @memberof CompanySiteDbService
     */
    public tableDB = "tenant_company_site";
    /**
     *Creates an instance of CompanySiteDbService.
     * @param {HttpService} httpService http service
     * @param {QueryParserService} queryService query service
     * @memberof CompanySiteDbService
     */
    constructor(public httpService: HttpService, public queryService: QueryParserService) {
        super(httpService, queryService, "tenant_company_site");
    }
}

/**
 * Service for company site
 *
 * @export
 * @class CompanySiteService
 */
@Injectable()
export class CompanySiteService {

    /**
     *Creates an instance of CompanySiteService.
     * @param {CompanySiteDbService} companySiteDbService DB service for company site
     * @memberof CompanySiteService
     */
    constructor(
        public readonly companySiteDbService: CompanySiteDbService) {
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
        let result = findAllList([fields, TENANT_GUID, this.companySiteDbService.queryService, this.companySiteDbService.httpService, this.companySiteDbService.tableDB]);
        return getListData(result);
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
        const filters = ['(TENANT_COMPANY_GUID=' + id + ')', '(TENANT_GUID=' + TENANT_GUID + ')'];
        const url = this.companySiteDbService.queryService.generateDbQueryV2(this.companySiteDbService.tableDB, fields, filters, []);
        return this.companySiteDbService.httpService.get(url);
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
        data.ACTIVATION_FLAG = 1;
        data.TENANT_GUID = user.TENANT_GUID;
        data.CREATION_USER_GUID = user.USER_GUID;

        this.inputDataCompanySite([data, d]);

        resource.resource.push(data);

        return this.companySiteDbService.createByModel(resource, [], [], []);

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
        data.TENANT_GUID = user.TENANT_GUID;

        this.inputDataCompanySite([data, d.data]);
        setUpdateData([data, user.USER_GUID]);

        resource.resource.push(data);

        return this.companySiteDbService.updateByModel(resource, [], [], []);
    }

    /**
     * Input data company site
     *
     * @param {[CompanySiteModel, CreateCompanySiteDTO]} [model, data]
     * @returns
     * @memberof CompanySiteService
     */
    public inputDataCompanySite([model, data]: [CompanySiteModel, CreateCompanySiteDTO]) {
        model.SITE_NAME = data.siteName;
        model.TENANT_COMPANY_GUID = data.companyId;
        model.REGISTRATION_NO = data.registrationNo;
        model.ADDRESS = data.address;
        model.ADDRESS2 = data.address2;
        model.ADDRESS3 = data.address3;
        model.CONTACT_NO = data.contactNo;
        model.EMAIL = data.email;
        model.CONTACT_PERSON = data.contactPersonName;
        model.CONTACT_PERSON_CONTACT_NO = data.contactPersonContactNo;
        model.CONTACT_PERSON_EMAIL = data.contactPersonEmail;
        model.WEBSITE = data.website;
        model.ISHQ = data.isHQ;

        return model;
    }

}
