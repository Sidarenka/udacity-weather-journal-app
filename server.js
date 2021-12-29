// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Set the port 
const port = 4000;

// Spin up the server
const server = app.listen(port, listening);

//Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on local host: ${port}`);
};

// GET route 
app.get('/retrieve', getData);

function getData (req, res) {
    console.log('GET request');
    res.send(projectData);
};

//POST route 
app.post('/add', postData);

function postData (req, res) {
   projectData = req.body;
   res.send({messaage: "POST recieved"});
   console.log(req);
};
