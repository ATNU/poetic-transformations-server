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
TODO: add researcher(s)   
[James Cummings](https://www.ncl.ac.uk/elll/staff/profile/jamescummings.html#background)   
[Tiago Sousa Garcia](https://www.ncl.ac.uk/elll/staff/profile/tiagosousa-garcia.html#publications)   


## Development Build

To use Docker:

Build a container using
```docker build -t pt/server .```
(this will tag the container as pt/server, this can be changed as preferred).
 
Run the container in detached mode using ```docker run -d -p 3000:3000 pt/server``` .


