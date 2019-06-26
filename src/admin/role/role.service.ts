import { Injectable } from "@nestjs/common";
import { RoleDTO } from "./dto/role.dto";
import { XMLParserService } from "src/common/helper/xml-parser.service";
import { CreateRoleModel } from "./model/create-role.model";
import { Resource } from "src/common/model/resource.model";
import { v1 } from "uuid";
import { RoleDbService } from "./db/role.db.service";

@Injectable()
export class RoleService {
    constructor(
        private readonly xmlParserService: XMLParserService,
        private readonly roleDbService: RoleDbService
    ) {}

    create(user: any, data: RoleDTO){
        // let tempData = this.xmlParserService.convertJsonToXML(data);
        // console.log(tempData);

        const resource = new Resource(new Array);
        const modelData = new CreateRoleModel();

        modelData.CODE = data.roleName;
        modelData.ROLE_GUID = v1();
        modelData.CREATION_TS = new Date().toISOString();
        modelData.CREATION_USER_GUID = user.USER_GUID;
        modelData.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(data);
        modelData.UPDATE_TS = null;
        modelData.UPDATE_USER_GUID = null;
        modelData.DESCRIPTION = data.description;

        resource.resource.push(modelData);
        console.log(resource)

        return this.roleDbService.createByModel(resource, [], [], []);
    }
}