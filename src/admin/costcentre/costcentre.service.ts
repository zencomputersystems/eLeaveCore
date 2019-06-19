import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { CostCentreModel } from './model/costcentre.model';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { SectionService } from '../section/section.service';

/**
 *
 *
 * @export
 * @class CostcentreService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class CostcentreService extends BaseDBService implements IDbService {
    private _tableName = 'main_cost_centre';

    constructor(
        public readonly httpService: HttpService,
        public readonly sectionService: SectionService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "main_cost_centre");
    }

    //find all tenant branch
    public findAll(TENANT_GUID: string): Observable<any> {

        const fields = ['COST_CENTRE_GUID', 'NAME'];
        const filters = ['(TENANT_GUID=' + TENANT_GUID + ')'];

        const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        //call DF to validate the user
        return this.httpService.get(url);

    }

    //find tenant branch by id
    public findById(TENANT_GUID: string, id: string): Observable<any> {
        const fields = ['COST_CENTRE_GUID', 'NAME'];
        const filters = ['(COST_CENTRE_GUID=' + id + ')', '(TENANT_GUID=' + TENANT_GUID + ')'];

        //url
        const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        //call DF to validate the user
        return this.httpService.get(url);
    }

    //create new branch
    create(user: any, name: string) {
        const data = new CostCentreModel();
        data.COST_CENTRE_GUID = v1();
        let resourceData = this.sectionService.createProcess(user, name, data);
        return this.createByModel(resourceData, [], [], []);
    }

    //update existing branch
    update(user: any, d: any) {

        // do a checking first to determine this data belong to user

        const resource = new Resource(new Array);
        const data = new CostCentreModel();

        data.COST_CENTRE_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.NAME = d.name;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        return this.updateByModel(resource, [], [], ['TENANT_GUID', 'COST_CENTRE_GUID']);

    }
}
