import { Injectable } from '@nestjs/common';
import { BranchDbService } from './db/branch.db.service';
import { map } from 'rxjs/operators';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * Service for branch
 *
 * @export
 * @class BranchService
 */
@Injectable()
export class BranchService {
    /**
     *Creates an instance of BranchService.
     * @param {BranchDbService} branchDbService
     * @param {CommonFunctionService} commonFunctionService
     * @memberof BranchService
     */
    constructor(private readonly branchDbService: BranchDbService,
        private readonly commonFunctionService: CommonFunctionService) { }

    /**
     * Method to get list branch
     *
     * @param {string} tenantId
     * @returns
     * @memberof BranchService
     */
    public getList(tenantId: string) {
        return this.commonFunctionService.getListData(this.branchDbService.findAll(tenantId));
    }
}