import { Injectable } from '@nestjs/common';
import { ProfileDefaultDbService } from './profile-default.db.service';
import { of, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Resource } from '../../common/model/resource.model';
import { ProfileDefaultModel } from './model/profile-default.model';
import uuid = require('uuid');

@Injectable()
export class ProfileDefaultService {
  constructor(private readonly profileDefaultDbService: ProfileDefaultDbService) { }

  findOne([tenantId]: [string]) {
    return this.profileDefaultDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]);
  }

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
  update([user, data]: [any, any]) {
    let resource = new Resource(new Array);
    let pdm = new ProfileDefaultModel();

    pdm.TENANT_GUID = user.TENANT_GUID;
    pdm.CALENDAR_PROFILE_GUID = data;

    resource.resource.push(pdm);

    return this.profileDefaultDbService.updateByModel(resource, [], [], []);

  }

  create([user, data]: [any, any]) {
    let resource = new Resource(new Array);
    let pdm = new ProfileDefaultModel();

    pdm.TENANT_GUID = user.TENANT_GUID;
    pdm.CALENDAR_PROFILE_GUID = data;

    resource.resource.push(pdm);

    return this.profileDefaultDbService.createByModel(resource, [], [], []);
  }

}