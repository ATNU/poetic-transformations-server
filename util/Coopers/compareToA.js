// const xmlConversion = require('../util/Coopers/XMLConversion.js').justText;
const lines = require('./XMLConversion').getLines;
const fs = require('fs');
const map = require('./XMLConversion').idTextMap;
const parse = require('./XMLConversion').parseXml;
const xmlToJson = require('xml-js');
const compare = require('./compareVersionToArch.js');
const _ = require('lodash');
const saveGrouped = require('./saveGroupedListToCSV.js').saveToFile;

// todo eventually keep track of spine index counter externally as will need to know
// what it is when adding a new file

// todo eventually , if the archetype has already had a comparison done on it, we should use the version with a spine index in the comparison here
// todo eventually will need to have a full mast csv list and keep adding to it

function compareToArchetype() {
    let fullList = [];

    const archetypeName = 'M1.xml'
    const versionToCompareName = 'M2.xml'

    // convert both to json object lists of lines
    const jsonArch = createJSONObjectList(archetypeName)
    const jsonVersion = createJSONObjectList(versionToCompareName)

    // add spine index by comparing 2 versions
    let compared = compare(jsonArch, jsonVersion)

    let archWithSpine = compared[0]
    let versionWithSpine = compared[1]

    fullList.push(compared[0]);
    fullList.push(compared[1]);

    const finalList = removeNesting(fullList);
    // could create a csv from final list here if wanted

    //create CSV file with lines grouped by spine index
    // const grouped = groupBySpine(finalList);
    // console.log(grouped)
    // saveGrouped(grouped, 'testingForCooperM1M2.csv');

    // organise by archetype's lines
    const orderedByArchetype = organiseByArchetypesLines(archWithSpine, versionWithSpine)
   console.log(orderedByArchetype)

}

compareToArchetype()


function createJSONObjectList(xmlFilename) {
    const xml = fs.readFileSync("../../data/" + xmlFilename);
    return map(lines(parse(xml)));
}


function removeNesting(fullList) {
    //create one long list of lines
    const innerListsRemoved = [];
    for (let group of fullList) {

        for (let line of group) {

            //check spine index and xml:id are defined
            if (line.spineIndex === undefined || line["xml:id"] === undefined) {
                continue;
            } else {
                innerListsRemoved.push({"xml:id": line["xml:id"], "spineIndex": line["spineIndex"], "xml": line["xml"], "text":line["_text"]});
            }
        }
    }
    return innerListsRemoved;
}

function groupBySpine(list) {

    //deduplicate
    const deduplicated = _.uniqBy(list, 'xml:id');

    const groupedBySpine = _.groupBy(deduplicated, 'spineIndex');
    const upperSpine = _.size(groupedBySpine);
    const groupedList = [];

    //for each spine index in grouped list
    for (let i = 1; i <= upperSpine; i++) {
        const lineObjList = groupedBySpine[i];
        //combine line ID's, texts, and xml into list
        const lineIDList = [];
        const xmlList = [];
        const textList = [];
        for (let sentence of lineObjList) {
            lineIDList.push(sentence["xml:id"]);
            xmlList.push(sentence["xml"]);
            textList.push(sentence["text"])
        }

        groupedList.push({"spineIndex": i, "lines": lineIDList, "xml": xmlList, "text": textList});
    }

    return groupedList;
}

function organiseByArchetypesLines(archetype, version) {
    //for each line in the archetype, get any line from version that shares a spine index. Remove this from the list so
    // we can also then have any lines in the version that are new

    let i;
    let versionList = version;
    let archetypeWithVersion = []

    for(i = 0; i < archetype.length; i++) {
        const spineIndex = archetype[i]['spineIndex']

        const matchingLineFromVersion = _.remove(versionList, (o) => {
           return o['spineIndex'] === spineIndex
        })
    // todo deal with if there is more than one matching line

        // if there is not a matching line, just add archetype
        if (matchingLineFromVersion[0] === undefined) {
           const lineObject = {
               spineIndex,
               archetypeId: archetype[i]['xml:id'],
               archetypeLine: archetype[i]['_text'],
           }
            archetypeWithVersion.push(lineObject);
        } else {
            // if there is a matchign line add these details
            const lineObject = {
                spineIndex,
                archetypeId: archetype[i]['xml:id'],
                archetypeLine: archetype[i]['_text'],
                matchingId: matchingLineFromVersion[0]['xml:id'],
                matchingLine: matchingLineFromVersion[0]['_text']
            }
            archetypeWithVersion.push(lineObject);
        }
    }
    // order by archetype's xml:id
    archetypeWithVersion = _.orderBy(archetypeWithVersion, (o) => {
        return o['xml:id']
    })

    // todo decide what to do with unused lines
    return archetypeWithVersion;

}
