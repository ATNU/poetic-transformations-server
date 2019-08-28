const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: './data/fullSpineIndex.csv',
    header: [
        {id: 'spineIndex', title: 'spineIndex'},
        {id: 'xml:id', title: 'xml:id'}
    ],
    fieldDelimiter: ';'
});

/**
 * Take a list of JSON objects containing spine index and line ID and write a text file in comma separated CSV form.
 * @param spineIndexJSON
 */
function saveToFile(spineIndexJSON) {
    csvWriter.writeRecords(spineIndexJSON)
        .then(() => {
            console.log("done");
        })
        .catch(err => console.log(err));

}

module.exports.saveToFile = saveToFile;