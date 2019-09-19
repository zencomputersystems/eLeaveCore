import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import moment = require('moment');
import { Resource } from 'src/common/model/resource.model';
import { AnnouncementModel } from './model/announcement.model';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { v1 } from 'uuid';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { filter } from 'rxjs/operators';

@Injectable()
export class AnnouncementService extends BaseDBService {

  private _tableName = "l_announcement";

  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "l_announcement")
  }

  findAll() {

    const fields = [];
    const filters = ['(FROM_DATE <= ' + moment().format('YYYY-MM-DD') + ') AND (TO_DATE >= ' + moment().format('YYYY-MM-DD') + ')'];
    const orders = 'CREATION_TS DESC';

    const url = this.queryService.generateDbQueryV3([this._tableName, fields, filters, orders, 20]);

    return this.httpService.get(url);

  }

  updateAnnouncement(d: UpdateAnnouncementDto, user: any) {

    const resource = new Resource(new Array);
    const data = new AnnouncementModel();

    data.TITLE = d.title;
    data.MESSAGE = d.message;
    data.IS_PINNED = d.isPinned;
    data.UPDATE_TS = new Date().toISOString();;
    data.UPDATE_USER_GUID = user.USER_GUID;


    resource.resource.push(data);
    return this.updateByModel(resource, [], ['(ANNOUNCEMENT_GUID = ' + d.announcementId + ')'], ['ANNOUNCEMENT_GUID']);


  }

  create(data: CreateAnnouncementDto, user: any) {

    const resource = new Resource(new Array);
    const modelData = new AnnouncementModel();

    modelData.ANNOUNCEMENT_GUID = v1();
    modelData.TITLE = data.title;
    modelData.MESSAGE = data.message;
    modelData.IS_PINNED = 0;
    modelData.FROM_DATE = new Date(data.fromDate).toISOString();
    modelData.TO_DATE = new Date(data.toDate).toISOString();
    modelData.CREATION_USER_GUID = user.USER_GUID;
    modelData.CREATION_TS = new Date().toISOString();

    resource.resource.push(modelData);

    return this.createByModel(resource, [], [], []);
  }

}