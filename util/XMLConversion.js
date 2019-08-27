const xmlToJson = require('xml-js');

/**
 * Convert supplied xml to a string representation of a JSON object
 * @param xml
 * @returns {string}
 */
function parseXml(xml) {
    try {
        const json= xmlToJson.xml2json(xml, {compact: true, spaces: 4});
        return JSON.parse(json);
    }
      catch (err) {
        console.log(err);
      }
}


/**
 * Extract line objects from a JSON representation of the xml
 * @param json (string)
 * @returns lines (JSON)
 */
function getLines(json) {
    try {
       // const parsed = JSON.parse(json);
        const lines = json["TEI"]["text"]["body"]["div"]["lg"];
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

    //each text block
    for (let k = 0; k < lines.length ; k++) {
    const block = lines[k]["l"];

    //each line object
        for (let m = 0; m < block.length; m++) {
            const line = block[m];

            //todo add spineIndex

            const xmlId = line._attributes["xml:id"];
            const text = line._text;
            const newLine = {"xml:id": xmlId, "_text": text};
            map.push(newLine);

        }
    }

    return map;
}

module.exports.parseXml = parseXml;
module.exports.getLines = getLines;
module.exports.idTextMap = idTextMap;
