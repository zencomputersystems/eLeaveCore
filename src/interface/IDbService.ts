import { Observable } from "rxjs";
import { Resource } from "src/common/model/resource.model";

export interface IDbService {
    findAll(GUID: string): Observable<any>;
    findById(GUID: any, id: string): Observable<any>;
    findByFilter(fields: string[], filters: string[]): Observable<any>;
    create(user: any, data: any);
    createByModel(resource: Resource,fields: string[], filters: string[], idFields: string[]);
    updateByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]);
}