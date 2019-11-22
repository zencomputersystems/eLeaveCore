import { NotFoundException, HttpModule } from '@nestjs/common';
import { DreamFactory } from '../../config/dreamfactory';
import moment = require('moment');

/**
 * Declare httpmodule
 */
const baseModule = HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } });

/**
 * Return http module
 *
 * @export
 * @returns
 */
export function getModuleHttp() {
  return baseModule;
}

/**
 * Verify query param or param link
 *
 * @export
 * @param {[any, string, string]} [req, key, id]
 * @returns
 */
export function verifyParam([req, key, id]: [any, string, string]) {
  let dataId = null;
  let dataIdParam = req.query[key];
  if (dataIdParam == null) {
    dataId = id;
  } else {
    dataId = dataIdParam;
  }
  if (dataId == null || dataId == '{' + key + '}') {
    throw new NotFoundException(`Item ${key} not found`);
  }
  return dataId;
}

/**
 * Get date duration
 *
 * @export
 * @param {[string, string]} [nowDate, pastDate]
 * @returns
 */
export function dateDuration([nowDate, pastDate]: [string, string]) {
  var a = moment(nowDate);
  var b = moment(pastDate);

  var years = a.diff(b, 'year');
  b.add(years, 'years');

  var months = a.diff(b, 'months');
  b.add(months, 'months');

  var days = a.diff(b, 'days');

  return { years, months, days };
}
