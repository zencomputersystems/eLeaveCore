export class ResultStatusService {
    public sendSuccess(data, res) {
        res.send(data.data);
    }

    public sendError(err, res) {
        if (err.response.data) {
            res.status(err.response.data.error.status_code);
            res.send(err.response.data.error.message)
        } else {
            res.status(500);
            res.send(err);
        }
    }
}