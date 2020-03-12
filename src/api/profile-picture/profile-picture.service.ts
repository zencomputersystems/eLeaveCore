import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Resource } from 'src/common/model/resource.model';
import { ProfilePictureModel } from './model/profile-picture.model';
import { ProfilePictureDto } from './dto/profile-picture.dto';
import { v1 } from 'uuid';
import { UserprofileDbService } from '../userprofile/db/userprofile.db.service';

@Injectable()
export class ProfilePictureDbService extends BaseDBService implements IDbService {
  public tableDB = "l_profile_picture";
  constructor(
    public httpService: HttpService,
    public queryService: QueryParserService) {
    super(httpService, queryService, "l_profile_picture");
  }
}

@Injectable()
export class ProfilePictureService {
  constructor(private readonly profilePictureDbService: ProfilePictureDbService,
    private readonly userprofileDbService: UserprofileDbService
  ) { }

  getProfilePicture([user, process]: [any, string]) {
    let filter = [];
    if (process == 'all')
      filter = [`(TENANT_GUID=${user.TENANT_GUID})`];
    else
      filter = [`(USER_GUID=${user.USER_GUID})`];

    return this.userprofileDbService.findByFilterV2(['USER_GUID', 'FULLNAME', 'PROFILE_PICTURE'], filter);
  }

  create([user, profilePictureDto]: [any, ProfilePictureDto]) {

    const resource = new Resource(new Array);
    const data = new ProfilePictureModel();

    data.PROFILE_PICTURE_GUID = v1();
    data.USER_GUID = user.USER_GUID;
    data.PROFILE_PICTURE_FILE = profilePictureDto.profilePictureFile;

    resource.resource.push(data);

    return this.profilePictureDbService.createByModel(resource, [], [], ['PROFILE_PICTURE_GUID', 'USER_GUID', 'PROFILE_PICTURE_FILE']);

  }

}