import { Injectable } from '@nestjs/common';
import { Observable, forkJoin, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { LeavetypeService } from '../../leavetype/leavetype.service';
import { Resource } from 'src/common/model/resource.model';
import { LeaveTransactionModel } from '../../../api/leave/model/leave-transaction.model';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import moment = require('moment');
import uuid = require('uuid');
import { CreateGeneralLeavePolicyDTO } from 'src/admin/general-leave-policy/dto/create-general-leave-policy.dto';
import { GeneralLeavePolicyXMLDTO } from 'src/admin/general-leave-policy/dto/xml/general-leave-policy-xml.dto';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Apply anniversary leave service
 *
 * @export
 * @class ApplyAnniversaryLeaveService
 */
@Injectable()
export class ApplyAnniversaryLeaveService {
  /**
   *Creates an instance of ApplyAnniversaryLeaveService.
   * @param {LeaveTransactionDbService} leaveTransactionDbService
   * @memberof ApplyAnniversaryLeaveService
   */
  constructor(
    // private readonly leavetypeService: LeavetypeService,
    private readonly leaveTransactionDbService: LeaveTransactionDbService
  ) { }

  /**
   * Apply anniversary leave
   *
   * @param {[Observable<any[]>, string, UserInfoModel[], any, number, Observable<any[]>]} [generalPolicy, companyId, activeUser, user, year, leavetypePolicy]
   * @returns
   * @memberof ApplyAnniversaryLeaveService
   */
  public applyAnniversaryLeave([generalPolicy, companyId, activeUser, user, year, leavetypePolicy]: [Observable<any[]>, string, any[], any, number, Observable<any[]>]) {

    return generalPolicy.pipe(mergeMap(res => {
      // console.log(activeUser[0]);
      let companyPolicy = res.find(x => x.TENANT_COMPANY_GUID === companyId);
      if (companyPolicy) {
        const policy: GeneralLeavePolicyXMLDTO = convertXMLToJson(companyPolicy.PROPERTIES_XML);

        if (policy.hasOwnProperty('anniversaryBonus')) {
          if (policy.anniversaryBonus.allowAutoApplyLeave == true) {

            let resource = new Resource(new Array);

            // loop if both applied or just one only
            policy.anniversaryBonus.applyLeaveOnDate.forEach(element1 => {
              console.log(element1);
              // loop each user
              activeUser.forEach(element => {
                console.log(element.DOB);
                console.log(element.JOIN_DATE);

                let dateToapply = element1 == 'birthday' ? element.DOB : element.JOIN_DATE;

                let d = new Date(dateToapply);

                let upcomingYear = year;
                if (year < new Date().getFullYear())
                  upcomingYear = new Date().getFullYear()
                d.setFullYear(upcomingYear);
                console.log(d);
                // setup data birthday and join date leave
                this.applyLeaveWholeYearSetup([element.USER_GUID, d.toString(), resource, user, companyId, element1]);
              })

            })

            // activeUser.forEach(element => {
            //   console.log(element.DOB);
            //   console.log(element.JOIN_DATE);

            //   let dateToapply = policy.anniversaryBonus.applyLeaveOnDate.find(x=>x === 'birthday') ? element.DOB : element.JOIN_DATE;

            //   let d = new Date(dateToapply);

            //   let upcomingYear = year;
            //   if (year < new Date().getFullYear())
            //     upcomingYear = new Date().getFullYear()
            //   d.setFullYear(upcomingYear);
            //   console.log(d);
            //   this.applyLeaveWholeYearSetup([element.USER_GUID, d.toString(), resource, user, companyId]);
            // })

            // console.log(resource);
            // console.log(activeUser[0].JOIN_DATE);
            console.log(resource);
            if (resource.resource.length > 0)
              return this.leaveTransactionDbService.createByModel(resource, [], [], []);
            else
              return of('No user');
          } else {
            console.log('Policy not allowed');
            return of('Policy not allowed');
          }
        } else {
          console.log('No anniversary configuration');
          return of('No anniversary configuration');
        }
      } else {
        console.log('no policy');
        return of('No policy');
      };

    })
    ).subscribe(data => {
      // console.log(data.data.resource);
      console.log('Execute apply anniversary leave');
    }, err => {
      console.log(err)
    });
  }

  /**
   * Apply leave whole year setup
   *
   * @private
   * @param {[string, string, Resource]} [userId, dob, resource]
   * @returns
   * @memberof ApplyAnniversaryLeaveService
   */
  private applyLeaveWholeYearSetup([userId, anvDate, resource, user, companyId, basedOn]: [string, string, Resource, any, string, string]) {
    let ltm = new LeaveTransactionModel();
    ltm.LEAVE_TRANSACTION_GUID = uuid(); // nn
    ltm.TENANT_GUID = user.TENANT_GUID;
    ltm.TENANT_COMPANY_GUID = companyId; // nn
    ltm.LEAVE_TYPE_GUID = 'Anniversary ' + basedOn; // nn
    ltm.ENTITLEMENT_GUID = 'Anniversary Policy'; // nn
    ltm.USER_GUID = userId; // nn

    ltm.START_DATE = new Date(anvDate);
    ltm.END_DATE = new Date(anvDate);

    ltm.STATUS = 'APPROVED';

    ltm.ACTIVE_FLAG = true;
    ltm.CURRENT_APPROVAL_LEVEL = 0;

    resource.resource.push(ltm);

    return resource;
  }

  /**
   * Verify anniversary leave
   *
   * @param {[CreateGeneralLeavePolicyDTO, any, number]} [generalPolicy, user, year]
   * @returns
   * @memberof ApplyAnniversaryLeaveService
   */
  public verifyAnniversaryLeave([generalPolicy, user, year]: [CreateGeneralLeavePolicyDTO, any, number]) {
    if (generalPolicy.anniversaryBonus.allowAutoApplyLeave) {
      console.log('im here');
      console.log(generalPolicy);
    } else {
      return null;
    }
    // return generalPolicy.pipe(mergeMap(res => {
    //   // console.log(activeUser[0]);
    //   let companyPolicy = res.find(x => x.TENANT_COMPANY_GUID === companyId);
    //   if (companyPolicy) {
    //     const policy = convertXMLToJson(companyPolicy.PROPERTIES_XML);

    //     if (policy.hasOwnProperty('anniversaryBonus')) {
    //       if (policy.anniversaryBonus.allowAutoApplyLeave == true) {

    //         let resource = new Resource(new Array);
    //         activeUser.forEach(element => {
    //           console.log(element.DOB);
    //           console.log(element.JOIN_DATE);
    //           let dateToapply = policy.anniversaryBonus.applyLeaveOnDate == 'birthday' ? element.DOB : element.JOIN_DATE;
    //           let d = new Date(dateToapply);

    //           let upcomingYear = year;
    //           if (year < new Date().getFullYear())
    //             upcomingYear = new Date().getFullYear()
    //           d.setFullYear(upcomingYear);
    //           console.log(d);
    //           this.applyLeaveWholeYearSetup([element.USER_GUID, d.toString(), resource, user, companyId]);
    //         })
    //         // console.log(resource);
    //         // console.log(activeUser[0].JOIN_DATE);
    //         console.log(resource);
    //         return this.leaveTransactionDbService.createByModel(resource, [], [], []);
    //       } else {
    //         console.log('Policy not allowed');
    //       }
    //     } else {
    //       console.log('No anniversary configuration');
    //     }
    //   } else {
    //     console.log('no policy');
    //   };

    // })
    // ).subscribe(data => {
    //   console.log(data.data.resource);
    // }, err => {
    //   console.log(err)
    // });

  }

}