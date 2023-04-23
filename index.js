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





//start express app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


