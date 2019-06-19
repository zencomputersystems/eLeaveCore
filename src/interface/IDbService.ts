import { Observable } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';

/**
 *
 *
 * @export
 * @interface IDbService
 */
export interface IDbService {

    findByFilterV2(fields: string[], filters: string[]): Observable<any>;
    createByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]);
    updateByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]);
}