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

        // poetic-trans use this:
        const lines = json["TEI"]["text"]["body"]["div"]["lg"];

        // todo change for coopers

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

    // todo change for coopers

    //each text block
    for (let k = 0; k < lines.length ; k++) {
        const block = lines[k]["l"];

        //each line object
        for (let m = 0; m < block.length; m++) {
            const line = block[m];
            const xmlId = line._attributes["xml:id"];

            // to get all text, look for _text and look for text hidden within any other tags
            let text = getTextIncludingTags(line)


            // recreate xml for this line to preserve
            const xmlObject = {
                l: line
            }
            const xml = xmlToJson.json2xml(xmlObject, {compact: true, ignoreComment: true, spaces: 4})

            // create new line object
            const newLine = {"xml:id": xmlId, "_text": text, "xml": xml};
            map.push(newLine);

        }
    }

    return map;
};

/**
 * Handle lines that begin with a tag to pull out text as these would otherwise return undefined. Also look beyond
 * first text to check for any additional text hidden in tags later in the line
 * @param line
 */
function getTextIncludingTags(line) {
    let text = line._text;

    // if there is a tag at the start of the line, we have undefined here which we don't want so replace with empty
    // string for now
    if (text === undefined) {
        text = ''
    }

    // look for any tags, other than _attributes
    let tags = Object.keys(line);
    // exclude _attributes and _text
    tags = _.filter(tags, (o) => {
        return o !== '_attributes';
    })
    tags = _.filter(tags, (o) => {
        return o !== '_text';
    })

    // if there are tags, add the text from them to text string
    if (tags.length > 0) {
        tags.forEach((tag) => {

            let t = line[tag]._text;

            if ( t !== undefined) {
                text = text + t
            } else  {
                // look at one more nested layer - could go further?
                // look for any tags, other than _attributes
                let tagsWithin = Object.keys(line[tag]);
                // exclude _attributes
                tagsWithin = _.filter(tagsWithin, (o) => {
                    return o !== '_attributes';
                })

                if (tagsWithin.length > 0) {
                    tagsWithin.forEach((tagWithin) => {

                        let tWithin = line[tag][tagWithin]._text;

                        if (tWithin !== undefined) {
                            t = tWithin
                            text = text + t
                        } else {
                            t = ''
                        }
                    })
                }

            }


        })
    }
    return text

}




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
