import { Injectable, HttpStatus} from '@nestjs/common';
import { HolidayDbService } from './db/holiday.db.service';
import { map } from 'rxjs/operators';
import { Resource } from 'src/common/model/resource.model';
import { HolidayModel } from './model/holiday.model';
import { UpdateHolidayDTO } from './dto/update-holiday.dto';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { v1 } from 'uuid';
import { CreateHolidayModel } from './model/create-holiday.model';
import { CreateCalendarDTO } from './dto/create-calendar.dto';

@Injectable()
export class HolidayService {
    constructor(private readonly holidayDbService: HolidayDbService,
        private readonly xmlParserService:XMLParserService) {}

    public getList(userinfoId: string) {
        return this.holidayDbService.findAll(userinfoId)
                    .pipe(map(res => {
                        if(res.status==200) {
                            console.log(this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML));
                            let jsonHoliday = this.xmlParserService.convertXMLToJson(res.data.resource[0].PROPERTIES_XML);
                            // return res.data.resource;
                            return jsonHoliday.response;
                        }
                    }))
    }

    //update existing branch
    update(user:any, d: UpdateHolidayDTO) {

        // do a checking first to determine this data belong to user
        
        const resource = new Resource(new Array);
        const data = new HolidayModel();

        data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.data);


        // data.COST_CENTRE_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        // data.NAME = d.name;
        // data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        console.log(resource);
        console.log('(USER_INFO_GUID='+d.id+')');
        let userinfoid = '0051f8ef-00aa-1543-08ee-bddb6a00524e';
        return this.holidayDbService.updateByModel(resource,[],['(USER_INFO_GUID='+d.id+')'],['PROPERTIES_XML']);
        // return HttpStatus.OK;
    }

    create(user: any, data: any){
        const resource = new Resource(new Array);
        const modelData = new CreateHolidayModel()
        // console.log(data);
        // let tempdata = JSON.parse(data);
        // console.log(this.xmlParserService.convertJsonToXML(tempdata));

        modelData.CALENDAR_GUID = v1();
        modelData.CREATION_TS = new Date().toISOString();
        modelData.CREATION_USER_GUID = user.USER_GUID;
        // modelData.PROPERTIES_XML = tempdata;
        modelData.PROPERTIES_XML = null;
        // this.xmlParserService.convertJsonToXML(data);
        modelData.UPDATE_TS = null;
        modelData.UPDATE_USER_GUID = null;

        console.log(modelData.PROPERTIES_XML);

        resource.resource.push(modelData);

        console.log(resource);
        return this.holidayDbService.createByModel(resource,[],[],[]);
    }
}