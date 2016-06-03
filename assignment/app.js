
/* the functioni sa Java script constructor which will be instantiated from
top level server.js */

/* req = parses the req from http, parses and makes it a nice clean object */

// params is part of the request. any variables in the path will be available as a a map in params

module.exports = function (app) {

    /* passing the instance app and immediately calling it*/
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);



    
    app.get("/say/:something", function(req, res){
        var msg = req.params['something'];
        res.send({message: msg});
    });
    
    
    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"},
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"},
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"}
    // ];
    // app.get("/users/:id", function (req, res) {
    //     var id = req.params.id;
    //     for(var i in users){
    //         if(users[i]._id === id ){
    //             res.send (users[i].firstName);
    //             return;
    //
    //         }
    //
    //     }
    //     res.send({});
    // });
};
