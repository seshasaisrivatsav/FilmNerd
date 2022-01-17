let express = require('express');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('passport'); //core passport library initialized here
let app = express();


let connectionString = 'mongodb+srv://seshasaisrivatsav:mongodbpassword@cluster0.brg0p.mongodb.net/filmNerd?retryWrites=true&w=majority';
let mongoose = require("mongoose");
mongoose.connect(connectionString);


let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* VVVIP : session has to be initialized AFTER Cookie Parser */
app.use(cookieParser());
//app.use(session({secret: process.env.SESSION_SECRET}));
app.use(session({secret: "aasdasd"}));


// First initialize passport and then tell it to use the express    session
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

let port = process.env.PORT || 3000;


let project = require("./project/app.js");
project(app);


app.listen(port,() => console.log(`API running on localhost:${port}`));

