import { NotificationDTO } from './dto/notification.dto';
import { Resource } from 'src/common/model/resource.model';
import { NotificationModel } from './model/notification.model.dto';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { Injectable, HttpService } from '@nestjs/common';
import { MailNotificationDTO } from './dto/mail-notification.dto';
import { UserInfoService } from '../user-info/user-info.service';
import { of } from 'rxjs';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { QueueNotificationDTO } from './dto/queue-notification.dto';
import { v1 } from 'uuid';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';

/**
 * Service for notification
 *
 * @export
 * @class NotificationService
 * @extends {BaseDBService}
 */
@Injectable()
export class NotificationService extends BaseDBService {
    /**
     * Declare tablename
     *
     * @private
     * @memberof NotificationService
     */
    private _tableName = "l_notification_queue";
    /**
     *Creates an instance of NotificationService.
     * @param {HttpService} httpService Service http
     * @param {QueryParserService} queryService Service query
     * @param {XMLParserService} xmlParserService xmlParserService
     * @memberof NotificationService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        public readonly xmlParserService: XMLParserService) {
        super(httpService, queryService, "l_notification_queue")
    }

    /**
     * find all notification
     *
     * @param {string} userId
     * @returns
     * @memberof NotificationService
     */
    findAll(userId: string) {

        // const fields = ['MESSAGE', 'PROPERTIES_XML', 'CATEGORY'];
        const fields = [];
        const filters = ['(USER_GUID=' + userId + ') OR (CATEGORY="new-announcement")'];
        const orders = 'CREATION_TS DESC';

        const url = this.queryService.generateDbQueryV3(this._tableName, fields, filters, orders);

        // call DF to validate the user
        return this.httpService.get(url);

    }

    /**
     * create notifocation
     *
     * @param {QueueNotificationDTO} data
     * @returns
     * @memberof NotificationService
     */
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
        modelData.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(data.remarks);

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