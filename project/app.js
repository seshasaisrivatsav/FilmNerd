module.exports = function (app) {
    let models = require("./model/models.server.js")();
    // pass the models to services.
    require("./services/user.service.server.js")(app, models);
    require("./services/movie.service.server.js")(app, models);

};

