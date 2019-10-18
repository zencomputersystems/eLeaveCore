import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import moment = require('moment');
import { Resource } from 'src/common/model/resource.model';
import { AnnouncementModel } from './model/announcement.model';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { v1 } from 'uuid';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

/**
 * Service for announcement
 *
 * @export
 * @class AnnouncementService
 * @extends {BaseDBService}
 */
@Injectable()
export class AnnouncementService extends BaseDBService {

  /**
   * Declare tablename
   *
   * @private
   * @memberof AnnouncementService
   */
  private _tableName = "l_announcement";

  /**
   *Creates an instance of AnnouncementService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof AnnouncementService
   */
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "l_announcement")
  }

  /**
   * Find all active announcement
   *
   * @returns
   * @memberof AnnouncementService
   */
  findAll() {

    const fields = [];
    const filters = ['(DELETED_AT IS NULL)'];
    const orders = 'CREATION_TS DESC';

    const url = this.queryService.generateDbQueryV3([this._tableName, fields, filters, orders, 20]);

    return this.httpService.get(url);

  }

  /**
   * Update announcement
   *
   * @param {UpdateAnnouncementDto} d
   * @param {*} user
   * @returns
   * @memberof AnnouncementService
   */
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

  /**
   * Delete announcement
   *
   * @param {string} d
   * @param {*} user
   * @returns
   * @memberof AnnouncementService
   */
  deleteAnnouncement(announcementId: string, user: any) {

    const resource = new Resource(new Array);
    const data = new AnnouncementModel();

    data.UPDATE_TS = new Date().toISOString();
    data.UPDATE_USER_GUID = user.USER_GUID;
    data.DELETED_AT = new Date().toISOString();

    resource.resource.push(data);
    return this.updateByModel(resource, [], ['(ANNOUNCEMENT_GUID = ' + announcementId + ')'], ['ANNOUNCEMENT_GUID']);

  }

  /**
   * Create announcement
   *
   * @param {CreateAnnouncementDto} data
   * @param {*} user
   * @returns
   * @memberof AnnouncementService
   */
  create(data: CreateAnnouncementDto, user: any) {

    const resource = new Resource(new Array);
    const modelData = new AnnouncementModel();

    modelData.ANNOUNCEMENT_GUID = v1();
    modelData.TITLE = data.title;
    modelData.MESSAGE = data.message;
    modelData.IS_PINNED = data.isPinned;
    modelData.CREATION_USER_GUID = user.USER_GUID;
    modelData.CREATION_TS = new Date().toISOString();

    resource.resource.push(modelData);

    return this.createByModel(resource, [], [], []);
  }

}