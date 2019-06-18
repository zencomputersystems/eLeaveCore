import { BaseDBService } from "src/common/base/base-db.service";
import { IDbService } from "src/interface/IDbService";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DashboardService extends BaseDBService implements IDbService {

}