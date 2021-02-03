const createCsvWriter = require('csv-writer').createObjectCsvWriter;



/**
 * Take a list of JSON objects containing spine index and line ID and write a text file in comma separated CSV form.
 * @param spineIndexJSON
 */
function saveToFile(spineIndexJSON, filename) {

    const csvWriter = createCsvWriter({
        path: '../../data/' + filename,
        header: [
            {id: 'spineIndex', title: 'spineIndex'},
            // {id: 'lines', title: 'xml:id'},
            // {id: 'xml', title: 'xml'},
            {id: 'text', title: 'lines'}
        ],
        fieldDelimiter: ';'
    });

    csvWriter.writeRecords(spineIndexJSON)
        .then(() => {
            console.log("done");
        })
        .catch(err => console.log(err));

}

module.exports.saveToFile = saveToFile;
