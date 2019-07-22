import { Controller, UseGuards, Patch, Body, Req, Res, Post, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { CommonFunctionService } from "src/common/helper/common-function.services";
import { NotificationDTO } from "./dto/notification.dto";
import { NotificationService } from "./notification.service";
import { MailNotificationDTO } from "./dto/mail-notification.dto";
import { EmploymentDetailBase } from "src/api/userprofile/dto/userprofile-detail/employment-detail/employment-detail-base.dto";
import { QueueNotificationDTO } from "./dto/queue-notification.dto";
import { map } from "rxjs/operators";
import { XMLParserService } from "src/common/helper/xml-parser.service";
import { UserService } from "../user/user.service";
import { UserInfoDbService } from '../holiday/db/user-info.db.service';

/**
 * controller for notification
 *
 * @export
 * @class NotificationController
 */
@Controller('/api/admin/notification')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class NotificationController {

    /**
     *Creates an instance of NotificationController.
     * @param {NotificationService} notificationService notification
     * @param {CommonFunctionService} commonFunctionService common function
     * @param {XMLParserService} xmlParserService xmlparser
     * @param {UserService} userService user service
     * @param {UserInfoDbService} userinfoDbService userinfo db service
     * @memberof NotificationController
     */
    constructor(private readonly notificationService: NotificationService,
        private readonly commonFunctionService: CommonFunctionService,
        private readonly xmlParserService: XMLParserService,
        private readonly userService: UserService,
        private readonly userinfoDbService: UserInfoDbService) { }

    // @Patch('/rules')
    // @ApiOperation({ title: 'Assign calendar profile to employee' })
    // updateNotificationRules(@Body() notificationDTO: NotificationDTO, @Req() req, @Res() res) {
    //     this.commonFunctionService.runUpdateService(this.notificationService.updateToEmployee(req.user, notificationDTO), res);
    // }

    // @Post('/mail')
    // @ApiOperation({ title: 'Send email to manager' })
    // sendEmailToManager(@Body() mailNotificationDTO: MailNotificationDTO, @Req() req, @Res() res) {
    //     // console.log(mailNotificationDTO);
    //     // res.send("Email send");
    //     let data  = this.notificationService.notifyProcess(mailNotificationDTO,req.user);
    //     res.send(data);
    // }

    /**
     * get notification
     *
     * @param {*} req
     * @param {*} res
     * @memberof NotificationController
     */
    @Get()
    @ApiOperation({ title: 'get notification for this user' })
    findAll(@Req() req, @Res() res) {
        // let userArray = [];
        const userFilter = ['(TENANT_GUID=' + req.user.TENANT_GUID + ')']
        this.userinfoDbService.findByFilterV2([], userFilter)
            .pipe(map(res => { return res; }))
            .subscribe(
                data => {
                    // userArray = data;
                    // let notifyArray = [];
                    this.getNotificationDetail(data, req, res);
                }, err => {
                    res.send(err);
                }
            );


        // this.notificationService.findAll(req.user.USER_GUID).pipe(map(result => {
        //     if (result.status == 200) {
        //         result.data.resource.forEach(element => {
        //             element.MESSAGE = element.MESSAGE.replace("[USER_NAME]", "Ang Rou Li");
        //             if (element.CATEGORY == 'new-announcement') {
        //                 // console.log(element.CATEGORY);
        //                 let temp;
        //                 if (element.PROPERTIES_XML) {



        //                     temp = this.xmlParserService.convertXMLToJson(element.PROPERTIES_XML);
        //                     // console.log(temp);
        //                     // console.log(userArray);
        //                     let checkUser = userArray.find(x => x.USER_GUID === temp.user_guid);
        //                     console.log(checkUser);
        //                     if (checkUser) {
        //                         element.MESSAGE = element.MESSAGE.replace("[USER_NAME]", checkUser.EMAIL);
        //                     }
        //                     element.MESSAGE = element.MESSAGE.replace("[DATE_LEAVE]", temp.date_leave);
        //                 }
        //             }
        //             element.CATEGORY = null;
        //         });
        //         return result.data.resource;
        //     }
        // })).subscribe(
        //     data => {
        //         res.send(data);
        //     }, err => {
        //         res.send(err);
        //     }
        // );
    }

    // @Post('/queue')
    // @ApiOperation({ title: 'Store notification queue' })
    // create(@Body() queueNotificationDTO: QueueNotificationDTO, @Req() req, @Res() res) {
    //     if (queueNotificationDTO.remarks)
    //         queueNotificationDTO.remarks = this.xmlParserService.convertJsonToXML(queueNotificationDTO.remarks);
    //     console.log(queueNotificationDTO);
    //     // res.send("Email send");
    //     // this.notificationService.create(queueNotificationDTO).subscribe(
    //     //     data => {
    //     //         res.send(data);
    //     //     }, err => {
    //     //         res.send(err);
    //     //     }
    //     // );
    //     this.commonFunctionService.runCreateService(this.notificationService.create(queueNotificationDTO), res);
    //     // let data  = this.notificationService.notifyProcess(queueNotificationDTO,req.user);
    //     // res.send(data);
    // }

    /**
     * get notification detail
     *
     * @param {*} userArray
     * @param {*} req
     * @param {*} res
     * @memberof NotificationController
     */
    public getNotificationDetail(userArray, req, res) {
        this.notificationService.findAll(req.user.USER_GUID).pipe(map(result => {
            if (result.status == 200) {
                return this.processData(userArray, result.data.resource, req);
                // return result.data.resource;
                // return notifyArray;
            }
        })).subscribe(
            data => {
                res.send(data);
            }, err => {
                res.send(err);
            }
        );
    }

    /**
     * get process data
     *
     * @param {*} userArray
     * @param {*} notifyData
     * @param {*} req
     * @returns
     * @memberof NotificationController
     */
    public processData(userArray, notifyData, req) {
        notifyData.forEach(element => {
            if (element.CATEGORY == 'user-leave' && element.PROPERTIES_XML != null) {
                let temp;
                // if (element.PROPERTIES_XML) {
                temp = this.xmlParserService.convertXMLToJson(element.PROPERTIES_XML);
                let checkUser = userArray.find(x => x.USER_GUID === temp.user_guid);
                if (checkUser) {
                    element.MESSAGE = element.MESSAGE.replace("[USER_NAME]", checkUser.FULLNAME);
                }
                element.MESSAGE = element.MESSAGE.replace("[DATE_LEAVE]", temp.date_leave);
                // }
            }
            else {
                let checkUser = userArray.find(x => x.USER_GUID === req.user.USER_GUID);
                element.MESSAGE = element.MESSAGE.replace("[USER_NAME]", checkUser.FULLNAME);
            }
            // notifyArray.push(element.MESSAGE, element.CATEGORY);
        });

        return notifyData;
    }
}