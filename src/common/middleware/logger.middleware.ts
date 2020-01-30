import { Logger } from '@nestjs/common';

/**
 * Logger function to log running api
 *
 * @export
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function logger(req, res, next) {
  // var date = new Date();
  // var timestamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  // var data = `[${timestamp}] [HTTP/${req.httpVersion}] [${req.method}] ${req.headers.referer}${req.url}`;
  // console.log(data);
  // console.log(req);
  var data = `[HTTP/${req.httpVersion}] ${req.headers.host}${req.url}`;
  Logger.log(data, `${req.method}`);
  next();
};