//we create a schema

module.exports = function () {
  var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

    var UserSchema = mongoose.Schema ({
        username : {type: String, required: true},
        password : String,
        firstName : String,
        lastName : String,
        dob: Date,
        dateCreated : {type: Date, default : Date.now} //Date.now is the current time
    }, {collection: "assignment.user" });

    return UserSchema;
};