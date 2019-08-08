import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';


@Injectable()
export class YearEndClosingService {
  constructor(
    private readonly userService: UserService,
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService
  ) { }
  public yearEndProcess(user: any): Observable<any> {
    // console.log('hello there');
    // const filters = ['(TENANT_GUID=58a035ca-b22f-1b4e-79c6-7e13ec15d2d2)'];
    // const userFilter = ['(TENANT_GUID=' + req.user.TENANT_GUID + ')']
    const userFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(DELETED_AT IS NULL)', '(ACTIVATION_FLAG=1)']
    let result = this.userService.findByFilterV2([], userFilter)
      .pipe(
        map(res => {
          // console.log('data');
          // const userArray = new Array();

          res.forEach(element => {

            let entitlement = this.getLeaveEntitlement(element.USER_GUID).subscribe(
              data => {
                if (data.length > 0) {
                  console.log('_______________________________________________________________');
                  console.log(data);
                }
              }, err => {
                console.log(err);
              }
            );
            // userArray.push(
            //   new UserprofileListDTO(element, new Access()));

          });

          // console.log(res);
          return res;
        })
      )
    // .subscribe(
    //   data => {
    //     console.log(data[0].USER_GUID);
    //     return data;
    //   }, err => {
    //     // console.log(err);
    //     return err;
    //   }
    // );

    // console.log(result);
    return result;
    // return of('userList');
  }

  public getLeaveEntitlement(userguid: string): Observable<any> {
    const userFilter = ['(USER_GUID=' + userguid + ')', '(PARENT_FLAG=1)'];
    return this.userLeaveEntitlementDbService.findByFilterV2([], userFilter).pipe(
      map(res => {
        // console.log('in function leave');
        // console.log(res);
        return res;
      }));
  }

}