import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueueNotificationDTO } from 'src/admin/notification/dto/queue-notification.dto';

/**
 * Common function used
 *
 * @export
 * @class CommonFunctionService
 */
export class CommonFunctionService {
    /**
     * general get function
     *
     * @param {*} method
     * @param {*} res
     * @memberof CommonFunctionService
     */
    public runGetService(method, res) {
        this.getResults(method, res, 'Fail to fetch resource');
    }

    /**
     * general create function
     *
     * @param {*} method
     * @param {*} res
     * @memberof CommonFunctionService
     */
    public runCreateService(method, res) {
        this.getResults(method, res, 'Fail to create resource');
    }

    /**
     * general update function
     *
     * @param {*} method
     * @param {*} res
     * @memberof CommonFunctionService
     */
    public runUpdateService(method, res) {
        this.getResults(method, res, 'Fail to update resource');
    }

    /**
     * calendar profile n role profile list
     *
     * @param {*} method
     * @param {*} res
     * @memberof CommonFunctionService
     */
    public runGetServiceV2(method, res) {
        method.subscribe(
            data => { this.sendResSuccessV3(data, res); },
            err => { this.sendResError('Fail to fetch resource', res); }
        );
    }





    /**
     * Get result method refactor
     *
     * @param {*} method
     * @param {*} res
     * @param {*} message
     * @memberof CommonFunctionService
     */
    public getResults(method, res, message) {
        method.subscribe(
            data => { this.sendResSuccess(data, res); },
            err => { this.sendResError(message, res); }
        );
    }





    // success

    /**
     * Success response for resource
     *
     * @param {*} data
     * @param {*} res
     * @memberof CommonFunctionService
     */
    public sendResSuccess(data, res) {
        if (data.status === 200) {
            res.send(data.data.resource);
        } else {
            res.status(data.status);
            res.send();
        }
    }

    /**
     * Success response for data.data
     *
     * @param {*} data
     * @param {*} res
     * @memberof CommonFunctionService
     */
    public sendResSuccessV2(data, res) { //sendSuccess
        res.send(data.data);
    }

    /**
     * Success response for data
     *
     * @param {*} data
     * @param {*} res
     * @memberof CommonFunctionService
     */
    public sendResSuccessV3(data, res) {
        res.send(data);
    }





    /**
     * failed response with code 400
     *
     * @param {*} message
     * @param {*} res
     * @memberof CommonFunctionService
     */
    public sendResError(message, res) {
        res.status(400);
        res.send(message);
    }

    /**
     * Failed response with custom code
     *
     * @param {*} res
     * @param {*} code
     * @param {*} msg
     * @memberof CommonFunctionService
     */
    public sendResErrorV2(res, code, msg) { //sendErrorV2
        res.status(code);
        res.send(msg);
    }

    /**
     * Failed response with checking response data
     *
     * @param {*} err
     * @param {*} res
     * @memberof CommonFunctionService
     */
    public sendResErrorV3(err, res) { //sendError
        if (err.response.data) {
            res.status(err.response.data.error.status_code);
            res.send(err.response.data.error.message)
        } else {
            res.status(500);
            res.send(err);
        }
    }




    /**
     * Get list data
     *
     * @param {*} method
     * @returns
     * @memberof CommonFunctionService
     */
    public getListData(method) {
        return method.pipe(map(res => {
            return this.getResData(res);
        }))
    }

    /**
     * Get resource data
     *
     * @param {*} res
     * @returns
     * @memberof CommonFunctionService
     */
    public getResData(res) {
        if (res.status == 200) {
            return res.data.resource;
        }
    }

    /**
     * find all list refactor
     *
     * @param {*} fields
     * @param {*} tenantId
     * @param {*} queryService
     * @param {*} httpService
     * @param {*} tableName
     * @returns {Observable<any>}
     * @memberof CommonFunctionService
     */
    public findAllList(fields, tenantId, queryService, httpService, tableName): Observable<any> {

        // const fields = ['BRANCH'];
        const filters = ['(TENANT_GUID=' + tenantId + ')'];

        //url
        const url = queryService.generateDbQueryV2(tableName, fields, filters, []);

        //call DF to validate the user
        return httpService.get(url);

    }

    public setNotificationData(employeeId, message, category) {
        let notify = new QueueNotificationDTO;
        notify.employeeId = employeeId;
        notify.message = message;
        notify.category = category;
        return notify;
    }
}