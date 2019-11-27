import { Injectable } from '@nestjs/common';
import { DisableUserDTO } from 'src/admin/user/dto/disable-user.dto';
import { UserService } from 'src/admin/user/user.service';
import { UserInfoDbService } from 'src/admin/holiday/db/user-info.db.service';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';

/**
 * User profile status service
 *
 * @export
 * @class UserProfileStatusService
 */
@Injectable()
export class UserProfileStatusService {
  /**
   *Creates an instance of UserProfileStatusService.
   * @param {UserInfoDbService} userInfoDbService
   * @param {UserService} userService
   * @memberof UserProfileStatusService
   */
  constructor(
    private readonly userInfoDbService: UserInfoDbService,
    private readonly userService: UserService
  ) {

  }
  /**
   * Resign and change status inactive
   *
   * @param {*} user
   * @param {DisableUserDTO} d
   * @returns
   * @memberof UserProfileStatusService
   */
  public resignAndChangeStatus(user: any, d: DisableUserDTO) {
    return this.userInfoDbService.setResignUser([user, d.user_guid, d.resign_date]).pipe(map(res => {
      let dateResign = new Date(d.resign_date);
      let dateTemp = new Date();
      let resChangeStatus;
      if (dateResign <= dateTemp) {
        // console.log('assign inactive');
        resChangeStatus = this.userService.updateUserInactive(user, d.user_guid).subscribe(
          data => {
            return data.data.resource;
          }), err => {
            return 'error';
          };
      }
      return res;
      //   // let mergeData = forkJoin(resChangeStatus,res);
      //   return { res, resChangeStatus };
      // }), mergeMap(res1 => {
      //   // let temp = forkJoin(of(res1.res), res1.resChangeStatus);
      //   // return res1.resChangeStatus;
      //   return of(res1.res);
    })
    )
  }
}