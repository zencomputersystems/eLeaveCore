import { j2xParser, parse } from 'fast-xml-parser';

/**
 * Service XMLJSON converter
 *
 * @export
 * @class XMLParserService
 */
export class XMLParserService {

    /**
     * Method convert JSON to XML
     *
     * @param {*} data
     * @returns
     * @memberof XMLParserService
     */
    public convertJsonToXML(data: any) {
        var defaultOptions = {
            attributeNamePrefix: "@_",
            attrNodeName: "@", //default is false
            textNodeName: "#text",
            ignoreAttributes: true,
            cdataTagName: "__cdata", //default is false
            cdataPositionChar: "\\c",
            format: false,
            indentBy: "  ",
            supressEmptyNode: false
        };

        const converter = new j2xParser(defaultOptions);

        return converter.parse(data);
    }

    /**
     * Method convert XML to JSON
     *
     * @param {*} data
     * @returns
     * @memberof XMLParserService
     */
    public convertXMLToJson(data: any) {
        return parse(data, { parseTrueNumberOnly: true });
    }
}