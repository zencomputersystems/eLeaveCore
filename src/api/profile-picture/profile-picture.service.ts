import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Resource } from 'src/common/model/resource.model';
import { ProfilePictureModel } from './model/profile-picture.model';
import { ProfilePictureDto } from './dto/profile-picture.dto';
import { v1 } from 'uuid';
import { UserprofileDbService } from '../userprofile/db/userprofile.db.service';

/**
 * Profile picture db service
 *
 * @export
 * @class ProfilePictureDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class ProfilePictureDbService extends BaseDBService implements IDbService {
  /**
   * Table db
   *
   * @memberof ProfilePictureDbService
   */
  public tableDB = "l_profile_picture";
  /**
   *Creates an instance of ProfilePictureDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof ProfilePictureDbService
   */
  constructor(
    public httpService: HttpService,
    public queryService: QueryParserService) {
    super(httpService, queryService, "l_profile_picture");
  }
}

/**
 * Profile picture service
 *
 * @export
 * @class ProfilePictureService
 */
@Injectable()
export class ProfilePictureService {
  /**
   *Creates an instance of ProfilePictureService.
   * @param {ProfilePictureDbService} profilePictureDbService Profile picture db service
   * @param {UserprofileDbService} userprofileDbService User profile db service
   * @memberof ProfilePictureService
   */
  constructor(
    private readonly profilePictureDbService: ProfilePictureDbService,
    private readonly userprofileDbService: UserprofileDbService
  ) { }

  /**
   * Get profile picture process
   *
   * @param {[any, string]} [user, process]
   * @returns
   * @memberof ProfilePictureService
   */
  getProfilePicture([user, process]: [any, string]) {
    let filter = [];
    if (process == 'all')
      filter = [`(TENANT_GUID=${user.TENANT_GUID})`];
    else
      filter = [`(USER_GUID=${user.USER_GUID})`];

    return this.userprofileDbService.findByFilterV2(['USER_GUID', 'FULLNAME', 'PROFILE_PICTURE'], filter);
  }

  /**
   * Save profile picture filename
   *
   * @param {[ProfilePictureDto]} [profilePictureDto]
   * @returns
   * @memberof ProfilePictureService
   */
  create([profilePictureDto]: [ProfilePictureDto]) {

    const resource = new Resource(new Array);
    const data = new ProfilePictureModel();

    data.PROFILE_PICTURE_GUID = v1();
    data.USER_GUID = profilePictureDto.userGuid;
    data.PROFILE_PICTURE_FILE = profilePictureDto.profilePictureFile;

    resource.resource.push(data);

    return this.profilePictureDbService.createByModel(resource, [], [], ['PROFILE_PICTURE_GUID', 'USER_GUID', 'PROFILE_PICTURE_FILE']);

  }

}