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




//reset all variables
app.get('/reset', (req, res) => {
    duration = 0;
    distance = 0;
    origin = "";
    destination = "";
    risk = 0;
    driverDetails = "";
    emergencyContactName = "";
    emergencyContactNumber = "";
    tripStatus = "not_started";
    res.send("reset");
});


const { Expo } = require('expo-server-sdk');

const expo = new Expo();

// An array of the client's Expo push tokens
const pushTokens = ['ExponentPushToken[QTnrYWLRenu6hTE7_TbLkj]'];
const path = require('path');

// Construct the path to the sound file
const soundFile = path.join(__dirname, 'assets', 'sos.aiff');
// Create the notification message with custom vibration and sound
const message = {
    to: pushTokens,
    sound: 'default',
    title: 'SOS',
    body: 'Your safety is at risk!',
    ios: {
      sound: soundFile,
      _displayInForeground: true,
      _category: 'SOS',
      _alertType: 'critical',
      _vibrationPattern: [500, 1000, 500, 1000, 500, 1000],
    },
    android: {
      channelId: 'default',
      sound: 'default',
      priority: 'max',
      vibrate: [500, 1000, 500, 1000, 500, 1000],
      color: '#FF0000',
    },
  };

// Send the message
const sendNotification = async () => {
  try {
    const response = await expo.sendPushNotificationsAsync([message]);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

//send notification endpoint
app.get('/sendNotification', (req, res) => {
    //send notification 5 times with 2 seconds interval
    for (var i = 0; i < 5; i++) {
        setTimeout(sendNotification, 3000 * i);
    }

    res.send("notification sent");
});

app.post('/risk', (req, res) => {
    risk = req.query.risk;
    if(parseInt(risk) > 70) {
        for (var i = 0; i < 5; i++) {
            setTimeout(sendNotification, 3000 * i);
        }
    }
    res.json(parseInt(risk));
});





//start express app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));