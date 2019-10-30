import { NotFoundException, HttpModule } from '@nestjs/common';
import { DreamFactory } from '../../config/dreamfactory';

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

