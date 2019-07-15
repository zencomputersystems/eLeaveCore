import { NotificationDTO } from "./dto/notification.dto";
import { Resource } from "src/common/model/resource.model";
import { NotificationModel } from "./model/notification.model.dto";
import { UserInfoDbService } from "../holiday/db/user-info.db.service";
import { Injectable, HttpService } from "@nestjs/common";
import { MailNotificationDTO } from "./dto/mail-notification.dto";
import { UserInfoService } from "../user-info/user-info.service";
import { of } from "rxjs";
import { XMLParserService } from "src/common/helper/xml-parser.service";
import { QueueNotificationDTO } from "./dto/queue-notification.dto";
import { v1 } from "uuid";
import { BaseDBService } from "src/common/base/base-db.service";
import { QueryParserService } from "src/common/helper/query-parser.service";

@Injectable()
export class NotificationService extends BaseDBService {
    private _tableName = "l_notification_queue";
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "l_notification_queue")
    }

    findAll(userId: string) {

        // const fields = ['MESSAGE', 'PROPERTIES_XML', 'CATEGORY'];
        const fields = [];
        const filters = ['(USER_GUID=' + userId + ')'];

        const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        // call DF to validate the user
        return this.httpService.get(url);

    }

    create(data: QueueNotificationDTO) {
        console.log(data);
        // let tempData = this.xmlParserService.convertJsonToXML(data);
        // console.log(tempData);

        const resource = new Resource(new Array);
        const modelData = new NotificationModel();

        modelData.QUEUE_GUID = v1();
        modelData.USER_GUID = data.employeeId;
        modelData.MESSAGE = data.message;
        modelData.READ_STATUS = 0;
        modelData.CATEGORY = data.category;
        modelData.CREATION_TS = new Date().toISOString();
        modelData.PROPERTIES_XML = data.remarks;

        resource.resource.push(modelData);
        console.log(resource)

        return this.createByModel(resource, [], [], []);
        // }
    }

    // public notifyProcess(mailNotificationDTO: MailNotificationDTO, user: any) {
    //     console.log(mailNotificationDTO);
    //     console.log(user);
    //     return this.userInfoService.findOneData(mailNotificationDTO.employeeId, user.TENANT_GUID)
    //     .subscribe(
    //         data => {
    //             // let dataTemp = JSON.stringify(data);

    //             // console.log(data.data.resource[0].PROPERTIES_XML);
    //             // console.log(util.inspect(data.data.resource[0]))
    //             // let xmlProperties = this.xmlParserService.convertXMLToJson(data.data.resource.PROPERTIES_XML);
    //             // console.log(xmlProperties);
    //             return 'email send';
    //         }, err => {
    //             // console.log(err);
    //             return err;
    //         }
    //     );
    //     // return mailNotificationDTO;
    // }
    // updateToEmployee(user: any, d: NotificationDTO) {
    //     const resource = new Resource(new Array);
    //     const data = new NotificationModel;

    //     console.log(d.notifier_guid);
    //     console.log(d.user_guid);
    //     data.NOTIFICATION_RULE = JSON.stringify(d.notifier_guid);
    //     data.UPDATE_TS = new Date().toISOString();
    //     data.UPDATE_USER_GUID = user.USER_GUID;
    //     let userList = '';
    //     for (let i = 0; i < d.user_guid.length; i++) {
    //         if (userList == '') {
    //             userList = '"' + d.user_guid[i] + '"';
    //         } else {
    //             userList = userList + ',"' + d.user_guid[i] + '"';
    //         }
    //     }

    //     resource.resource.push(data);

    //     return this.userinfoDbService.updateByModel(resource, [], ['(USER_GUID IN (' + userList + '))'], []);
    // }
}