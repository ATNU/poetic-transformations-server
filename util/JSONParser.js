const xmlToJson = require('xml-js');


/** Take a JSOn representation of an xml document and convert to xml
 */
function toXml(json) {
    return xmlToJson.js2xml(json);
}

module.exports.toXml = toXml;