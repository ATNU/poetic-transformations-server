
/**
 * Values needed to create a connection to the eXist-db API to submit a resource request or query
 */


const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

module.exports = {


        URINoDB: DB_CONNECTION_STRING,
        URI: DB_CONNECTION_STRING + '/db/transformations/',
        URIQuery: DB_CONNECTION_STRING + '/db/transformations?_query=',
};
