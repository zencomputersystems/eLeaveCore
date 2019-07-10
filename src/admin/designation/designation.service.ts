import { Injectable } from '@nestjs/common';
import { DesignationDbService } from './db/designation.db.service';
import { map } from 'rxjs/operators';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Service for designation
 *
 * @export
 * @class DesignationService
 */
@Injectable()
export class DesignationService {
    /**
     *Creates an instance of DesignationService.
     * @param {DesignationDbService} designationDbService
     * @param {CommonFunctionService} commonFunctionService
     * @memberof DesignationService
     */
    constructor(private readonly designationDbService: DesignationDbService,
        private readonly commonFunctionService: CommonFunctionService) { }

    /**
     * Get all list for designation
     *
     * @param {string} tenantId
     * @returns
     * @memberof DesignationService
     */
    public getList(tenantId: string) {
        return this.commonFunctionService.getListData(this.designationDbService.findAll(tenantId));
        // return this.designationDbService.findAll(tenantId)
        //     .pipe(map(res => {
        //         if (res.status == 200) {
        //             return res.data.resource;
        //         }
        //     }))
    }
}
