import { Injectable } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';

@Injectable()
export class DesignationService  extends BaseDBService implements IDbService{

    findAll(GUID: string): import("rxjs").Observable<any> {
        throw new Error("Method not implemented.");
    }    
    
    findById(GUID: any, id: string): import("rxjs").Observable<any> {
        throw new Error("Method not implemented.");
    }
    
    create(user: any, data: any) {
        throw new Error("Method not implemented.");
    }


}
