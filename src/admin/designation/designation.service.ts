import { Injectable } from '@nestjs/common';
import { DesignationDbService } from './db/designation.db.service';
import { map } from 'rxjs/operators';

/**
 * Service for designation
 *
 * @export
 * @class DesignationService
 */
@Injectable()
export class DesignationService {
    constructor(private readonly designationDbService: DesignationDbService) { }

    /**
     * Get all list for designation
     *
     * @param {string} tenantId
     * @returns
     * @memberof DesignationService
     */
    public getList(tenantId: string) {
        return this.designationDbService.findAll(tenantId)
            .pipe(map(res => {
                if (res.status == 200) {
                    return res.data.resource;
                }
            }))
    }
}
