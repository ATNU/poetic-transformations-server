const xmlToJson = require('xml-js');
const _ = require ('underscore');

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

            const xmlId = line._attributes["xml:id"];
            const text = line._text;
            const newLine = {"xml:id": xmlId, "_text": text};
            map.push(newLine);

        }
    }

    return map;
};

/**
 * Extract only the text from the poem as one long string (no punctuation or undefined sections)
 * @param xml
 * @returns {string}
 */
const justText = xml => {
    const parsed = parseXml(xml);
    const lines = getLines(parsed);

    let text = "";

    //each text block
    for (let k = 0; k < lines.length ; k++) {
        const block = lines[k]["l"];

        //each line object
        for (let m = 0; m < block.length; m++) {
            const line = block[m];
            let sentence = line._text;
           let sentenceString;
            //can't deal with lines that are undefined
            if (sentence === undefined) {
                continue;
            }

            //if sentence is a list break into a string and remove punctuation
            if (_.isArray(sentence)) {
                sentenceString = processList(sentence);
            }
            //otherwise just remove punctuation
            else {
                sentenceString = sentence.replace( /[^\w\s]/g, "");
            }

            text = text + " " + sentenceString;
        }
    }
    return text.replace(/undefined/g, "");
};

//break up lines that appear as lists (happens where there are internal tags)
const processList = list => {
    let wholeSentence;

       for (let i = 0; i < list.length; i++) {
            const part = list[i];

            if (part === undefined) {
                continue;
            }

            const noPunc = part.replace( /[^\w\s]/g, "");
            wholeSentence = wholeSentence + " " + noPunc;
        }
       return wholeSentence;
};


module.exports.parseXml = parseXml;
module.exports.getLines = getLines;
module.exports.idTextMap = idTextMap;
module.exports.justText = justText;
