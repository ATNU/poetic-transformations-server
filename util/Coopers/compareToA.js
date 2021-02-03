// const xmlConversion = require('../util/Coopers/XMLConversion.js').justText;
const lines = require('./XMLConversion').getLines;
const fs = require('fs');
const map = require('./XMLConversion').idTextMap;
const parse = require('./XMLConversion').parseXml;
const archetypeName = 'P1.xml'
const versionToCompareName = 'M1.xml'
const xmlToJson = require('xml-js');

function getLines() {

    let mappedList = [];


        //get xml and convert
        const xml = fs.readFileSync("../../data/M1.xml");
        const mapped = map(lines(parse(xml)));
        mappedList.push(mapped);

    // console.log(mappedList);


    //get xml and convert
//     const xml = ' <lg>\n' +
//         '               <l xml:id="M5.2">But what was Pakistan? a better life.</l>\n' +
//         '               <l xml:id="M5.3"><del change="#change-b">New country</del>, a bolt-hole,<metamark\n' +
//         '                     change="#change-b" rend="caret" function="unclear"/> a road of bone?</l>\n' +
//         '               <!-- Changed caret to metamark rend caret -> should it be <g>? -->\n' +
//         '            </lg>'
// let lines = parse(xml)
//     lines = lines['lg']['l']
//     //each text block
//     for (let k = 0; k < lines.length ; k++) {
//         const line = lines[k];
//             const xmlId = line._attributes["xml:id"];
//             const text = line._text
//         const xmlObject = {
//                 l: line
//         }
//
//         const xml = xmlToJson.json2xml(xmlObject, {compact: true, ignoreComment: true, spaces: 4})
//             const newLine = {"xml:id": xmlId, "_text": text, "xml": xml};
// console.log(newLine)





    // var options = {compact: true, ignoreComment: true, spaces: 4};
    // const backToXML = xmlToJson.json2xml(ls, options);
    // console.log('test' + backToXML);
//
// //each text block
//     for (let k = 0; k < ls.length ; k++) {
//         const block = ls[k]["l"];
//
//         //each line object
//         for (let m = 0; m < block.length; m++) {
//             const line = block[m];
//
//             const xmlId = line._attributes["xml:id"];
//             const text = line._text;
//
//             const newLine = {"xml:id": xmlId, "_text": text};
//
//
//         }
//     }
}

getLines()
