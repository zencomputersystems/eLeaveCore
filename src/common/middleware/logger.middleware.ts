export function logger(req, res, next) {
    var date = new Date();
    var timestamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var data = `[${timestamp}] [HTTP/${req.httpVersion}] [${req.method}] ${req.headers.referer}${req.url}`;
    console.log(data);
    next();
  };