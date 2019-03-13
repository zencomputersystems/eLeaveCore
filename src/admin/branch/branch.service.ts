import { Injectable} from '@nestjs/common';
import { BranchDbService } from './db/branch.db.service';
import { map } from 'rxjs/operators';

@Injectable()
export class BranchService {
    constructor(private readonly branchDbService: BranchDbService) {}

    public getList(tenantId: string) {
        return this.branchDbService.findAll(tenantId)
                .pipe(map(res => {
                    if(res.status==200) {
                        return res.data.resource;
                    }
                }))
    }
}