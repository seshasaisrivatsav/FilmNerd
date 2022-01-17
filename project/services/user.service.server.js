var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //added recently
var bcrypt = require("bcrypt-nodejs");


// Running Locally

// var googleConfig = {
//     clientID     : "19483974661-f0g4hn8mplkvlc9dm9kip4refl4k0u2i.apps.googleusercontent.com",
//     clientSecret : "jmupSkxQtUqRuuhAKTcOfddz",
//     callbackURL  : "http://127.0.0.1:3000/auth/google/callback"
// };

var googleConfig = {
    clientID     : "19483974661-f0g4hn8mplkvlc9dm9kip4refl4k0u2i.apps.googleusercontent.com",
    clientSecret : "jmupSkxQtUqRuuhAKTcOfddz",
    callbackURL  : "https://film-nerd.herokuapp.com/auth/google/callback"
};


// Running on a host https://film-nerd.herokuapp.com/
// var googleConfig = {
//     clientID     : process.env.GOOGLE_CLIENT_ID,
//     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL  : process.env.GOOGLE_CALLBACK_URL
// };



module.exports= function(app, models){

    var userModel = models.userModel;
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.put("/api/project/:userId/rateandreview", rateandreview);
    app.get("/api/project/user", getUsers);
    app.post("/api/project/user", createUser);
    app.post("/api/project/register", register);
    app.get("/api/project/loggedIn",loggedIn);
    app.post("/api/project/logout", logout);
    app.post('/api/project/login', passport.authenticate('FilmNerd'), login);
    app.get("/api/project/user/:userId", findUserById);
    app.delete("/api/project/user/:userId", deleteUser);
    app.put("/api/project/user/:userId", updateUser);
    app.put("/api/project/user/follows/:userId", followUser);
    app.put("/api/project/user/:userId/unfollows/:username", unfollowUser);
    app.get('/api/project/findallusers', findallusers);
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));
    
  passport.use('FilmNerd', new LocalStrategy(localStrategy));

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }



    //done - is to notify passport of success/failures

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function rateandreview(req, res) {

        var id = req.params.userId;
        var rateandreview = req.body;
 
        userModel
            .updateRatesandReviews(id, rateandreview)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    
    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }


    function findallusers(req, res) {

        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }
    
    
    function register(req,res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                    if(user){
                        res.status(400).send("Username is in use");
                        return;
                    }else{
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);

                    }
                },
                function (err) {
                    res.status(400).send(err);

                })

            .then(
                function (user) {
                    if(user){
                        //provided by passport
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err);
                            }else{
                                res.json(user);
                            }
                        })
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {

                    if(user && bcrypt.compareSync(password, user.password)){
                      done(null,user);

                    }else {
                        done("Error in login!", null);
                    }
                },
                function(err) {
                    done(err);
                });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    function login ( req, res){
        var user = req.user;
        res.json(user);
    }


    function loggedIn(req,res) {
      if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;


        userModel
            .updateUser(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }
    
    function followUser(req, res) {
        var id = req.params.userId;
        var follows = req.body;

        userModel
            .followUser(id, follows)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function unfollowUser(req, res) {
        var id = req.params.userId;
        var username = req.params.username;

        console.log(id +" "+username);

        userModel
            .unfollowUser(id, username)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    // function createUser(req,res) {
    //     var user = req.body;
    //     userModel
    //         .createUser(user)
    //         .then(
    //             function(user){
    //
    //                 res.json(user);
    //             },
    //             function(error){
    //                 res.statusCode(404).send(error);
    //             }
    //         )
    //
    // }

    function createUser(req, res) {
        const username = req.body.username;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body)
                    }
                },
                function (err) {
                    console.log("pandi");
                    console.log(err);
                    res.sendStatus(400).send(err);
                }
            )
            .then(
                function (user) {
                    if(user){
                        res.sendStatus(200);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

    }



    function deleteUser(req,res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            //responds with some stats
            .then(function (stats) {

                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });


    }



    function findUserById(req, res){
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });

    }

    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(username, password, req, res);
        } else if(username){
            findUserByUsername(username, res);
        }else {
            findAllUsers();
        }
    }

    function findUserByCredentials (username, password, req, res){
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                    req.session.currentUser= user;
                    res.json(user);
                },
                function (err) {
                    res.statusCode(404).send(err);
                });
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }


};