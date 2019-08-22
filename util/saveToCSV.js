
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './data/spineIndex.csv',
    header: [
        {id: 'spineIndex', title: 'SPINE INDEX'},
        {id: 'xml:id', title: 'TARGET'}
    ]
});

function saveToFile(spineIndexJSON) {
    csvWriter.writeRecords(spineIndexJSON)
        .then(() => {
            console.log("done");
        })
        .catch(err => console.log(err));

}

module.exports.saveToFile = saveToFile;