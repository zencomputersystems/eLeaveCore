import { DreamFactory } from "src/config/dreamfactory";

export class QueryParserService {

    generateDbQuery(tableName: string, fields:Array<string>, filters:Array<string>) {
        let url = DreamFactory.df_host+tableName+"?";
        let field = "";
        let filter = "";

        if(fields.length>0) {
            field = "fields="+fields.join(",");
        }

        if(filters.length>0) {
            if(field!=="")
                filter = "&";

            filter = filter+"filter="+filters.join("AND");
        }

        return url+field+filter;


    }

}