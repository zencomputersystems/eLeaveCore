import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class CommonFunctionService {
    //general get function
    public runGetService(method, res) {
        this.getResults(method, res, 'Fail to fetch resource');
    }

    //general create function
    public runCreateService(method, res) {
        this.getResults(method, res, 'Fail to create resource');
    }

    //general update function
    public runUpdateService(method, res) {
        this.getResults(method, res, 'Fail to update resource');
    }

    //calendar profile n role profile list
    public runGetServiceV2(method,res){
        method.subscribe(
            data => { this.sendResSuccessV3(data, res); },
            err => { this.sendResError('Fail to fetch resource', res); }
        );
    }





    public getResults(method, res, message) {
        method.subscribe(
            data => { this.sendResSuccess(data, res); },
            err => { this.sendResError(message, res); }
        );
    }





    // success

    public sendResSuccess(data, res) {
        if (data.status === 200) {
            res.send(data.data.resource);
        } else {
            res.status(data.status);
            res.send();
        }
    }

    public sendResSuccessV2(data, res) { //sendSuccess
        res.send(data.data);
    }

    public sendResSuccessV3(data, res) {
        res.send(data);
    }





    //failed
    public sendResError(message, res) {
        res.status(400);
        res.send(message);
    }

    public sendResErrorV2(res, code, msg) { //sendErrorV2
        res.status(code);
        res.send(msg);
    }

    public sendResErrorV3(err, res) { //sendError
        if (err.response.data) {
            res.status(err.response.data.error.status_code);
            res.send(err.response.data.error.message)
        } else {
            res.status(500);
            res.send(err);
        }
    }




    public getListData(method) {
        return method.pipe(map(res => {
            return this.getResData(res);
        }))
    }

    public getResData(res) {
        if (res.status == 200) {
            return res.data.resource;
        }
    }

    public findAllList(fields,tenantId,queryService,httpService,tableName): Observable<any> {

        // const fields = ['BRANCH'];
        const filters = ['(TENANT_GUID=' + tenantId + ')'];

        //url
        const url = queryService.generateDbQueryV2(tableName, fields, filters, []);

        //call DF to validate the user
        return httpService.get(url);

    }

}