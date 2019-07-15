import { DreamFactory } from 'src/config/dreamfactory';

/**
 * Service for query
 *
 * @export
 * @class QueryParserService
 */
export class QueryParserService {

    /**
     * Method generate db query 
     *
     * @param {string} tableName
     * @param {Array<string>} fields
     * @param {Array<string>} filters
     * @returns
     * @memberof QueryParserService
     */
    generateDbQuery(tableName: string, fields: Array<string>, filters: Array<string>) {
        let url = DreamFactory.df_host + tableName + "?";
        let field = "";
        let filter = "";

        if (fields.length > 0) {
            field = "fields=" + fields.join(",");
        }

        if (filters.length > 0) {
            if (field !== "")
                filter = "&";

            filter = filter + "filter=" + filters.join("AND");
        }

        return url + field + filter;


    }

    /**
     * Method generate db query additional idfields parameter
     *
     * @param {string} tableName
     * @param {Array<string>} fields
     * @param {Array<string>} filters
     * @param {Array<string>} idFields
     * @returns
     * @memberof QueryParserService
     */
    generateDbQueryV2(tableName: string, fields: Array<string>, filters: Array<string>, idFields: Array<string>) {
        let url = DreamFactory.df_host + tableName + "?";

        const paramArray = [];


        // build the parameter
        if (fields.length > 0) {
            const field = "fields=" + fields.map(res => encodeURIComponent(res)).join(",");

            paramArray.push(field);
        }

        if (filters.length > 0) {

            const filter = "filter=" + filters.map(res => encodeURIComponent(res)).join("AND");

            paramArray.push(filter);
        }


        if (idFields.length > 0) {
            const idField = "id_field=" + idFields.map(res => encodeURIComponent(res)).join(",");

            paramArray.push(idField);
        }

        const buildurl = url + paramArray.join("&");
        return buildurl;

    }

    //const url = DreamFactory.df_host+this.table_name+"?id_field=TENANT_GUID%2CCOST_CENTRE_GUID";


}