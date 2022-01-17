let express = require('express');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('passport'); //core passport library initialized here
let app = express();


// let connectionString = 'mongodb://127.0.0.1:27017/webdev-assignment';
let connectionString = 'mongodb://sesha:sesha@ds113825.mlab.com:13825/filmnerd';


// if(process.env.MONGODB_DB_PASSWORD) {
//     connectionString = "mongodb://" + process.env.MONGODB_DB_USERNAME + ":" +
//         process.env.MONGODB_DB_PASSWORD + "@" +
//         process.env.MONGODB_DB_HOST + '.mlab.com:' +
//         process.env.MONGODB_DB_PORT + '/' +
//         process.env._APP_NAME;
// }


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

