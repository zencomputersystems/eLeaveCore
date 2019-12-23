import { Injectable } from '@nestjs/common';
import { HolidayDbService } from 'src/admin/holiday/db/holiday.db.service';
import { map } from 'rxjs/operators';
import { WorkingHoursDbService } from 'src/admin/working-hours/db/working-hours.db.service';
import { RoleDbService } from 'src/admin/role/db/role.db.service';

/**
 * function to remove hardcode duplicate 
 *
 * @export
 * @class AssignerDataService
 */
@Injectable()
export class AssignerDataService {
    /**
     * jsondata is result array from db, datamodel is example dto
     *
     * @param {*} jsonData
     * @param {*} dataModel
     * @returns
     * @memberof AssignerDataService
     */
    public assignArrayData(jsonData: any, dataModel: any) {
        let dataList = [];
        for (var i in jsonData) {
            let tempData = this.assignOneData(jsonData[i], dataModel);
            dataList.push(tempData);
        }
        return dataList;
    }

    /**
     * val is result object from db, datamodel is example dto
     *
     * @param {*} val
     * @param {*} dataModel
     * @returns
     * @memberof AssignerDataService
     */
    public assignOneData(val: any, dataModel: any) {
        let inputData = new dataModel;
        for (var j in val) {
            var sub_key = j;
            var sub_val = val[j];
            let lwrCseKey = sub_key.toLowerCase();
            inputData[lwrCseKey] = sub_val;
        }
        return inputData;
    }

    /**
     * Set bundle userguid
     *
     * @param {*} d
     * @returns
     * @memberof AssignerDataService
     */
    public setBundleUserGuid(d: any) {
        let userList = '';
        for (let i = 0; i < d.user_guid.length; i++) {
            if (userList == '') {
                userList = '"' + d.user_guid[i] + '"';
            } else {
                userList = userList + ',"' + d.user_guid[i] + '"';
            }
        }
        return userList;
    }

    /**
     * Process profile item
     *
     * @param {([string, HolidayDbService | WorkingHoursDbService | RoleDbService, any])} [url, dbService, dataModel]
     * @returns
     * @memberof AssignerDataService
     */
    public processProfile([url, dbService, dataModel]: [string, HolidayDbService | WorkingHoursDbService | RoleDbService, any]) {
        return dbService.httpService.get(url).pipe(map(res => {
            if (res.status == 200) { return this.assignArrayData(res.data.resource, dataModel); }
        }));
    }
}
