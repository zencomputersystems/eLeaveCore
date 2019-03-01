import { UserCsvDto } from "./user-csv.dto";

export class UserImportSuccessDTO {
    constructor(public USER_ID: string, public USER_IMPORT: UserCsvDto) {}
}