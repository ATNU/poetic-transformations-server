const xmlToJson = require('xml-js');

/**
 * Convert supplied xml to a string representation of a json object
 * @param xml
 * @returns {string}
 */
function parseXml(xml) {
        const json= xmlToJson.xml2json(xml, {compact: true, spaces: 4});
        return json;
}

function jsonReadyToQuery(unparsed) {
    return JSON.parse(unparsed);
}

/**
 * Extract poem body from a json representation of the xml
 * @param json (string)
 * @returns lines (JSON)
 */
function getLines(json) {
    try {
        const parsed = JSON.parse(json);
        const lines = parsed["exist:result"]["l"];
        return lines;
    } catch(err) {
    console.log(err);
}

}

/**
 * Extract key information from a JSON representation of the poem body. Each line is made up of a line ID (xml:id) and text (_text)
 * @param lines
 * @returns {Array}
 */
const idTextMap = (lines) => {
    const map = [];
    for (let index = 0; index < lines.length; index++)  {
        const lineBlock = lines[index];
        const xmlId = lineBlock._attributes["xml:id"];
        const text = lineBlock._text;
        const line = {"xml:id": xmlId, "_text": text};
        map.push(line);
    }
    return map;
}

module.exports.parseXml = parseXml;
module.exports.getLines = getLines;
module.exports.idTextMap = idTextMap;