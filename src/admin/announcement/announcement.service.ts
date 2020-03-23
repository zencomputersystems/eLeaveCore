import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Resource } from 'src/common/model/resource.model';
import { AnnouncementModel } from './model/announcement.model';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { v1 } from 'uuid';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { setUpdateData } from 'src/common/helper/basic-functions';

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
    const orders = 'IS_PINNED DESC,CREATION_TS DESC';

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

    this.inputDataAnnouncement([data, d]);
    setUpdateData([data, user.USER_GUID]);

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

    data.DELETED_AT = new Date().toISOString();
    setUpdateData([data, user.USER_GUID]);

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
    modelData.CREATION_USER_GUID = user.USER_GUID;
    this.inputDataAnnouncement([modelData, data]);

    resource.resource.push(modelData);
    return this.createByModel(resource, [], [], []);

  }

  /**
   * Input data announcement
   *
   * @param {([AnnouncementModel, UpdateAnnouncementDto | CreateAnnouncementDto])} [model, data]
   * @returns
   * @memberof AnnouncementService
   */
  public inputDataAnnouncement([model, data]: [AnnouncementModel, UpdateAnnouncementDto | CreateAnnouncementDto]) {
    model.TITLE = data.title;
    model.MESSAGE = data.message;
    model.IS_PINNED = data.isPinned;
    model.ATTACHMENT = data.attachment;

    return model;

  }

}