import { Injectable } from '@nestjs/common';

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
}
