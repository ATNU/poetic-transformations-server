// import path from "path";
// import fs from "fs";
const fetch = require('node-fetch');
const URI = require('../util/connection.js').URIQuery;
const dbConnection = require('../util/connection.js');
const path = require('path');
const fs = require('fs');


async function addData() {

   // check env vars are present
    const attempts = process.env.DB_CONNECTION_ATTEMPTS;
    const timeout = process.env.DB_CONNECTION_TIMEOUT;
    if (isNaN(parseInt(attempts)) || isNaN(parseInt(timeout))) {
        throw new Error('attempts and timeout not present');
    }


    if (await attemptConnection(attempts, timeout)) {
        console.log('database is up');

        // put data in database

        // data files - look for all files with the xml filename

        //
        // // todo before deployment remove confirmatory console logs?

        let readDir = false;
        try {
            const resourcesDir = path.join(__dirname, '../data');
            console.log('look for resources directory: ' + __dirname + '../data');
            fs.readFileSync(path.join(__dirname, '../data/B.xml'));
            readDir = true;
            console.log(readDir);
        } catch(error) {
            console.log('error in try catch block reading file ' + error);
            throw new Error('Cannot read data file');
        }

        if (readDir) {
            const resourcesDir = path.join(__dirname, '../data');
            // if have successfully read the directory, loop through each xml file
            fs.readdir(resourcesDir, async (err, files) => {
                if (err) {
                    console.log('error with readdir' + err);
                }

                //config files
                const configUrl = process.env.DB_CONNECTION_STRING + '/system/config/db/transformations/'
                await attemptToPutFile('collection.xconf', configUrl).then(async () => {
console.log('done');
                    // filter for xml extension
                    const xmlFilenames = files.filter(function(file) {
                        return path.extname(file).toLowerCase() === '.xml';
                    });

                    for (const xml of xmlFilenames) {
                        await attemptToPutFile(xml, process.env.DB_CONNECTION_STRING + '/db/transformations/');
                    }

                    // filter for xsl extension
                    const xslFilenames = files.filter(function(file) {
                        return path.extname(file).toLowerCase() === '.xsl';
                    });

                    for (const xsl of xslFilenames) {
                        await attemptToPutFile(xsl, process.env.DB_CONNECTION_STRING + '/db/transformations/');
                    }


                })


            });
        }
    }
}


module.exports.addData = addData;


async function attemptConnection(attempts, timeout) {

    const attemptsLeft = attempts;
    console.log('Attempt to connect ' + attemptsLeft + ' times to the db');
    const attemptTimeout = timeout;
    console.log('Leave ' + attemptTimeout + ' ms between attempts');

    // ----- setup query and url
    // query that should return 200 if the db is running
    const testQuery = 'xquery version "3.1";\n' +
        'declare default element namespace "http://www.tei-c.org/ns/1.0";\n' +
        '\n' +
        'let $collection:=collection(/db)\n' +
        'return $collection\n';
    const encodedTestQuery = encodeURI(testQuery);
    const testURL = process.env.DB_CONNECTION_STRING + '/db?_howmany=100&_query=' + encodedTestQuery;
    console.log('going to try to call this URL: ' + testURL);


    const fetchOptions = {
        headers: {
            "Content-Type": "application/XML",
            "Accept": "*/*"
        },
        method: "GET"
    };


    const fetchRetry = async (url, options, attempt) => {


        try {
            const response = await fetch(url, options);
            console.log('RESPONSE' + response);
            if (!response.ok) {
                // something has gone wrong as db is up but not responding as expected
                throw new Error("Invalid response from database.");
            }
            return response;

        } catch (error) {
            console.warn('attempt to connect has failed, retrying in 10 seconds, ' + (attempt - 1) + ' attempts left')
            if (attempt <= 1) {
                console.warn('Server has failed to receive a 200 status from the database so is stopping.')
                throw new Error('Cannot connect to database');
            }
            await sleep(attemptTimeout);
            return fetchRetry(url, options, attempt - 1);
        }
    };
    return await fetchRetry(testURL, fetchOptions, attemptsLeft);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


async function attemptToPutFile(filename,baseUrl) {

    const attemptsLeft = process.env.DB_CONNECTION_ATTEMPTS;
    console.log('Attempt to connect ' + attemptsLeft + ' times to the db');
    const attemptTimeout = process.env.DB_CONNECTION_TIMEOUT;
    console.log('Leave ' + attemptTimeout + ' ms between attempts');

    // ----- setup query and url
    const URLWithFile = baseUrl + filename;
    console.log('going to try to put request using this url: ' + URLWithFile);

    const fetchOptions = {
        headers: {
            "Content-Type": "application/xml",
            "Accept": "*/*"
        },
        method: "PUT",
        body: fs.readFileSync(path.join(__dirname, '../data/' + filename))
    };


    const fetchRetry = async (url, options, attempt) => {
        try {
            const response = await fetch(url, options);

            //expect 201 confirmation
            if (response.status === 201) {
                console.log('successfully entered file ' + filename);
            }

            if(response.status != 201) {
                console.log(fetchOptions.body);
                // something has gone wrong as db is up but not responding as expected
                console.error("ERROR: Unexpected response entering file " + filename + ' with response: ' + response);
                console.log(response);
            }
            return response;

        } catch (error) {
            console.log('attempt to connect has failed entering file ' + filename + ', retrying in 10 seconds, ' + (attempt -1) + ' attempts left')
            if (attempt <= 1) {
                console.error('Error: Final attempt to connect to database has failed entering file ' + filename);
            }
            await sleep(attemptTimeout);
            return fetchRetry(url, options, attempt - 1);
        }
    };
    return await fetchRetry(URLWithFile, fetchOptions, attemptsLeft);
}



