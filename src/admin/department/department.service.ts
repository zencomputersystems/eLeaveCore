import { Injectable} from '@nestjs/common';
import { DepartmentDbService } from './db/department.db.service';
import { map } from 'rxjs/operators';

/**
 *
 *
 * @export
 * @class DepartmentService
 */
@Injectable()
export class DepartmentService {
    constructor(private readonly departmentDbService: DepartmentDbService) {}

    public getList(tenantId: string) {
        return this.departmentDbService.findAll(tenantId)
                    .pipe(map(res => {
                        if(res.status==200) {
                            return res.data.resource;
                        }
                    }))
    }
}