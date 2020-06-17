# Poetic Transformations (server)
### Server for the Poetic Transformations ATNU project. 

The server uses the node.js express framework and, in addition to various middleware tasks, communicates with the poetic transformations database API. 

The server is also responsible for generating two CSV files relating to the auto-generated spine index applied to the xml files hard coded into the 'data' folder. Should these files be updated, the spine index generation should be re-run and the CSV files will be re-populated.

The spine index is auto-generated using a [cosine-similarity comparison](https://medium.com/@sumn2u/string-similarity-comparision-in-js-with-examples-4bae35f13968) (based on word similarity between each line of the poem).

All xquerys are saved for reference in the queries folder. 

### Developers
[Kate Court](www.github.com/katecourt)   
[Fiona Galston](https://github.com/fiona-galston)

### Researchers
 
[James Cummings](https://www.ncl.ac.uk/elll/staff/profile/jamescummings.html#background)   
[Tiago Sousa Garcia](https://www.ncl.ac.uk/elll/staff/profile/tiagosousa-garcia.html#publications)   


## Development Build

To use Docker:

Build a container using
```docker build -t pt/server .```
(this will tag the container as pt/server, this can be changed as preferred).
 
Run the container in detached mode using ```docker run -d -p 3000:3000 pt/server ```


### Environment variables (local values)
local server to docker exist
DB_CONNECTION_STRING= "http://admin:@localhost:8080/exist/rest"

or

docker server to docker exist
DB_CONNECTION_STRING = 'http://admin:@172.17.0.2:8080/exist/rest'

DB_CONNECTION_ATTEMPTS = 10
DB_CONNECTION_TIMEOUT = 10000

### Adding data to exist-db
On startup the server tries to put data files into the database and errors if the database is not up or does not return 
the expected responses. This is enough to enable viewing the files. 

To enable searching there are some extra steps:
After the server has finished adding data, you need to navigate in the browser to the exist-db GUI (go to database URL and click 'exide').
The, navigate in the file structure panel on the left to db/system/config/db/transformations/collection.xconf. Open this file and then
click 'save'. You should see a popup asking you to click 'OK'. Do this and the search feature should now work.
