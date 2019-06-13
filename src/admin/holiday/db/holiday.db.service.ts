import { Injectable, HttpService } from "@nestjs/common";
import { BaseDBService } from "src/common/base/base-db.service";
import { QueryParserService } from "src/common/helper/query-parser.service";
import { Observable } from "rxjs";

@Injectable()
export class HolidayDbService extends BaseDBService {
    private _tableName = "l_calendar_profile";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService){
            super(httpService,queryService,"l_calendar_profile");
        }

    //find all tenant branch
    public findAll(calendarProfileId:string): Observable<any> {

        const fields = ['PROPERTIES_XML'];
        const filters = ['(CALENDAR_GUID='+calendarProfileId+')'];
       
        const url = this.queryService.generateDbQueryV2(this._tableName,fields,filters,[]);

        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find all tenant branch
    public findAllProfile(): Observable<any> {

        const fields = ['CALENDAR_GUID','CODE'];
        const filters = [];
       
        const url = this.queryService.generateDbQueryV2(this._tableName,fields,filters,[]);

        //call DF to validate the user
        return this.httpService.get(url);
        
    }

}