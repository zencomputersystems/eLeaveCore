import {j2xParser, parse} from 'fast-xml-parser';

export class XMLParserService {
    
    public convertJsonToXML(data:any) {
        var defaultOptions = {
            attributeNamePrefix : "@_",
            attrNodeName: "@", //default is false
            textNodeName : "#text",
            ignoreAttributes : true,
            cdataTagName: "__cdata", //default is false
            cdataPositionChar: "\\c",
            format: false,
            indentBy: "  ",
            supressEmptyNode: true
        };

        const converter = new j2xParser(defaultOptions);

        return converter.parse(data);
    }

    public convertXMLToJson(data: any) {
        return parse(data);
    }
}