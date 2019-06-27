export class CommonFunctionService {

    public runGetService(method, res) {
        this.getResults(method, res, 'Fail to fetch resource');
    }

    public runCreateService(method, res) {
        this.getResults(method, res, 'Fail to create resource');
    }

    public runUpdateService(method, res) {
        this.getResults(method, res, 'Fail to update resource');
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



}