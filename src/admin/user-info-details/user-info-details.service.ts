import { Injectable } from '@nestjs/common';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { UpdateUserInfoDetailsDTO } from './dto/update-user-info-details.dto';
import { of, Observable } from 'rxjs';
import { EmploymentDetailsDTO } from './dto/employment-details.dto';
import { PersonalDetailsDTO } from './dto/personal-details.dto';
import { map, mergeMap } from 'rxjs/operators';
import { XMLParserService } from '../../common/helper/xml-parser.service';

@Injectable()
export class UserInfoDetailsService {
  constructor(
    private readonly userinfoDbService: UserInfoDbService,
    private readonly xmlParserService: XMLParserService
  ) { }

  public updateUserInfo(data: UpdateUserInfoDetailsDTO, userGuid: string): Observable<any> {
    console.log(data);
    console.log(userGuid);
    return of(data);
  }

  public updateEmploymentInfo(data: EmploymentDetailsDTO, userGuid: string) {
    console.log(data);
    console.log(userGuid);
    return of(data);
  }

  public updatePersonalInfo(data: PersonalDetailsDTO, userGuid: string) {
    // console.log(data);
    // console.log(userGuid);
    let results = this.getUserInfoDetails(userGuid).pipe(
      map(res => {
        // console.log(res.data.resource);
        let dataInfo = new UpdateUserInfoDetailsDTO();
        if (res.data.resource.length > 0) {
          console.log(res.data.resource[0].PROPERTIES_XML);
          dataInfo = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
        }
        console.log(dataInfo);
        dataInfo.personalDetails = data;
        console.log(dataInfo);
        return of(dataInfo);
        // return dataInfo;
      }), mergeMap(res => {
        console.log(res);
        // update process here
        return res;
      })
    );
    // return of(data);
    return results;
  }

  public getUserInfoDetails(userGuid: string): Observable<any> {
    const filters = ['(USER_GUID=' + userGuid + ') AND (RESIGNATION_DATE IS NULL)'];
    return this.userinfoDbService.findUserInfo(filters);
  }

}