import { IsNotEmpty, IsString} from "class-validator";
import { PersonalDetailXML } from "./xml/personal-detail.xml";

export class UpdatePersonalDetailDTO extends PersonalDetailXML {
    @IsNotEmpty()
    @IsString()
    id: string;

}