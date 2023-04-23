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


//init whatsapp client
const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
 
const sendMessage = async (number, message) => {
    const id = await client.getNumberId(number); 
    await client.sendMessage(id._serialized,message);
}


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
var timer = 45; //45 seconds
var lastLatLong = "";

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
app.get('/timer', (req, res) => res.json(timer));
app.get('/lastLatLong', (req, res) => res.json(lastLatLong));


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
app.post('/lastLatLong', (req, res) => {
    lastLatLong = req.query.lastLatLong;
    res.json(lastLatLong);
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
    timer = 45;
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

var timerInterval = null;
//send notification endpoint
app.get('/sendNotification', (req, res) => {
    //send notification 5 times with 2 seconds interval
    for (var i = 0; i < 10; i++) {
        setTimeout(sendNotification, 3000 * i);
    }

    res.send("notification sent");
});

app.post('/risk', (req, res) => {
    risk = req.query.risk;
    if(parseInt(risk) > 70 && timerInterval == null) {
        startEmergencyService();
    }
    res.json(parseInt(risk));
});




//start express app
app.listen(port, () => console.log(`Backend app listening on port ${port}!`));

const startEmergencyService = async () => {
    for (var i = 0; i < 10; i++) {
        setTimeout(sendNotification, 3000 * i);
    }
    //start timer for 45 seconds to 0 seconds
    timerInterval = setInterval(() => {
        timer--;
        if(timer === 0) {
            //initiate emergency
            initiateEmergency();
        }
    }
    , 1000);
}

const stopEmergencyService = async () => {
    //stop timer
    clearInterval(timerInterval);
    timer = 45;
    risk = 0;
}

const initiateEmergency = async () => {

    //send whatsapp message
    const message = `Hello ${emergencyContactName}, I'm in danger. \nDriver details: ${driverDetails}.
    \nLast location: https://www.google.com/maps?q=${lastLatLong}`;
    try {
        await sendMessage(emergencyContactNumber, message);
    }
    catch(error) {
        console.log(error);
    }
    //send notification
    
}