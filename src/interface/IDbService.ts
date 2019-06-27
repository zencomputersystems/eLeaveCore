import { Observable } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';

/**
 * Interface for IDbService
 *
 * @export
 * @interface IDbService
 */
export interface IDbService {

    /**
     * Find by filter v2
     *
     * @param {string[]} fields
     * @param {string[]} filters
     * @returns {Observable<any>}
     * @memberof IDbService
     */
    findByFilterV2(fields: string[], filters: string[]): Observable<any>;

    /**
     * Create by model
     *
     * @param {Resource} resource
     * @param {string[]} fields
     * @param {string[]} filters
     * @param {string[]} idFields
     * @memberof IDbService
     */
    createByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]);

    /**
     * Update by model
     *
     * @param {Resource} resource
     * @param {string[]} fields
     * @param {string[]} filters
     * @param {string[]} idFields
     * @memberof IDbService
     */
    updateByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]);
}