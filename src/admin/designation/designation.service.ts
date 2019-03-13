import { Injectable } from '@nestjs/common';
import { DesignationDbService } from './db/designation.db.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DesignationService {
    constructor(private readonly designationDbService: DesignationDbService) {}

    public getList(tenantId: string) {
        return this.designationDbService.findAll(tenantId)
                .pipe(map(res => {
                    if(res.status==200) {
                        return res.data.resource;
                    }
                }))
    }
}
