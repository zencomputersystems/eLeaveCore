import { Injectable } from '@nestjs/common';
import { ProfileDefaultDbService } from './profile-default.db.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Resource } from '../../common/model/resource.model';
import { ProfileDefaultModel } from './model/profile-default.model';

/**
 * Profile default service
 *
 * @export
 * @class ProfileDefaultService
 */
@Injectable()
export class ProfileDefaultService {
  /**
   *Creates an instance of ProfileDefaultService.
   * @param {ProfileDefaultDbService} profileDefaultDbService Declare db to use
   * @memberof ProfileDefaultService
   */
  constructor(private readonly profileDefaultDbService: ProfileDefaultDbService) { }

  /**
   * Find profile by tenant
   *
   * @param {[string]} [tenantId]
   * @returns
   * @memberof ProfileDefaultService
   */
  findOne([tenantId]: [string]) {
    return this.profileDefaultDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]);
  }

  /**
   * Check profile default if exist go to update process
   *
   * @param {[any, any]} [user, data]
   * @returns
   * @memberof ProfileDefaultService
   */
  updateProfile([user, data]: [any, any]) {
    return this.findOne([user.TENANT_GUID]).pipe(
      mergeMap(res => {
        let method: Observable<any>;

        if (res.length > 0) {
          method = this.update([user, data]);
        } else {
          method = this.create([user, data]);
        }
        return method;
      })
    )

  }
  /**
   * Update tenant profile default
   *
   * @param {[any, any]} [user, data]
   * @returns
   * @memberof ProfileDefaultService
   */
  update([user, data]: [any, any]) {
    let resource = new Resource(new Array);
    let pdm = new ProfileDefaultModel();

    pdm.TENANT_GUID = user.TENANT_GUID;
    if (data.profile == 'calendar')
      pdm.CALENDAR_PROFILE_GUID = data.id;
    else if (data.profile == 'working-hour')
      pdm.WORKING_HOURS_PROFILE_GUID = data.id;
    else if (data.profile == 'role')
      pdm.ROLE_PROFILE_GUID = data.id;
    else if (data.profile == 'attendance')
      pdm.ATTENDANCE_PROFILE_GUID = data.id;

    resource.resource.push(pdm);

    return this.profileDefaultDbService.updateByModel(resource, [], [], []);

  }

  /**
   * Crfeate tenant profile default
   *
   * @param {[any, any]} [user, data]
   * @returns
   * @memberof ProfileDefaultService
   */
  create([user, data]: [any, any]) {
    let resource = new Resource(new Array);
    let pdm = new ProfileDefaultModel();

    pdm.TENANT_GUID = user.TENANT_GUID;
    if (data.profile == 'calendar')
      pdm.CALENDAR_PROFILE_GUID = data.id;
    else if (data.profile == 'working-hour')
      pdm.WORKING_HOURS_PROFILE_GUID = data.id;
    else if (data.profile == 'role')
      pdm.ROLE_PROFILE_GUID = data.id;
    else if (data.profile == 'attendance')
      pdm.ATTENDANCE_PROFILE_GUID = data.id;

    resource.resource.push(pdm);

    return this.profileDefaultDbService.createByModel(resource, [], [], []);
  }

}