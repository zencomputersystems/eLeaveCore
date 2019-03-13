import { UserCsvDto } from "./csv/user-csv.dto";

export class UserImportSuccessDTO {
    constructor(public USER_ID: string, public USER_IMPORT: UserCsvDto) {}
}