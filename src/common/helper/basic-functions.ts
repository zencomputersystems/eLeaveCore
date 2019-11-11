import { NotFoundException, HttpModule } from '@nestjs/common';
import { DreamFactory } from '../../config/dreamfactory';
import moment = require('moment');

const baseModule = HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } });

export function getModuleHttp() {
  return baseModule;
}

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

export function getInfo(dataField: string) {
  return '(SELECT ' + dataField + ' FROM user_info ui WHERE USER_GUID = USER_GUID ORDER BY CREATION_TS DESC LIMIT 1) AS ' + dataField;
}