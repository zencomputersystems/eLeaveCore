import { Injectable } from '@nestjs/common';
import { DepartmentDbService } from './db/department.db.service';
import { map } from 'rxjs/operators';

/**
 * Service for department
 *
 * @export
 * @class DepartmentService
 */
@Injectable()
export class DepartmentService {
    constructor(private readonly departmentDbService: DepartmentDbService) { }

    /**
     * Method get list all department
     *
     * @param {string} tenantId
     * @returns
     * @memberof DepartmentService
     */
    public getList(tenantId: string) {
        return this.departmentDbService.findAll(tenantId)
            .pipe(map(res => {
                if (res.status == 200) {
                    return res.data.resource;
                }
            }))
    }
}