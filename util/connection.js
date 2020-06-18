
/**
 * Values needed to create a connection to the eXist-db API to submit a resource request or query
 */


const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
// const DB_CONNECTION_ATTEMPTS = process.env.DB_CONNECTION_ATTEMPTS;
// const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;


module.exports = {

        // dbConnectionAttempts: DB_CONNECTION_ATTEMPTS,
        // dbConnectionTimeout: DB_CONNECTION_TIMEOUT,
        URINoDB: DB_CONNECTION_STRING,
        URI: DB_CONNECTION_STRING + '/db/transformations/',
        URIQuery: DB_CONNECTION_STRING + '/db/transformations?_query=',
        URINoDBWithQuery: DB_CONNECTION_STRING + '/db?_howmany=100&_query='

};
