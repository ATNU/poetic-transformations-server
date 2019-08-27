const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    append: 'true',
    path: './data/spineIndex.csv',
    header: [
        {id: 'spineIndex', title: 'SPINE INDEX'},
        {id: 'xml:id', title: 'TARGET'}
    ]
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