// express app
const express = require('express');
const app = express();
const port = 3000;

//cors
const cors = require('cors');
app.use(cors());

//allow all requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res) => res.send('Hello World!'));

var duration = 0;
var distance = 0;
var origin = "";
var destination = "";
var risk = 0;

var driverDetails = "";
var emergencyContactName = "";
var emergencyContactNumber = "";
var tripStatus = "not_started";

//implement crud operations for the above variables with 200 status code and json response
app.get('/duration', (req, res) => res.json(parseInt(duration)));
app.get('/distance', (req, res) => res.json(parseInt(distance)));
app.get('/origin', (req, res) => res.json(origin));
app.get('/destination', (req, res) => res.json(destination));
app.get('/risk', (req, res) => res.json(parseInt(risk)));
app.get('/driverDetails', (req, res) => res.json(driverDetails));
app.get('/emergencyContactName', (req, res) => res.json(emergencyContactName));
app.get('/emergencyContactNumber', (req, res) => res.json(emergencyContactNumber));
app.get('/tripStatus', (req, res) => res.json(tripStatus));

app.post('/duration', (req, res) => {
    duration = req.query.duration;
    res.json(parseInt(duration));
});
app.post('/distance', (req, res) => {
    distance = req.query.distance;
    res.json(parseInt(distance));
});
app.post('/origin', (req, res) => {
    origin = req.query.origin;
    res.json(origin);
});
app.post('/destination', (req, res) => {
    destination = req.query.destination;
    res.json(destination);
});
app.post('/risk', (req, res) => {
    risk = req.query.risk;
    res.json(parseInt(risk));
});
app.post('/driverDetails', (req, res) => {
    driverDetails = req.query.driverDetails;
    res.json(driverDetails);
});
app.post('/emergencyContactName', (req, res) => {
    emergencyContactName = req.query.emergencyContactName;
    res.json(emergencyContactName);
});
app.post('/emergencyContactNumber', (req, res) => {
    emergencyContactNumber = req.query.emergencyContactNumber;
    res.json(emergencyContactNumber);
});
app.post('/tripStatus', (req, res) => {
    tripStatus = req.query.tripStatus;
    res.json(tripStatus);
});



//start express app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


