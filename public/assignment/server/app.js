module.exports = function(app, mongoose, db) {
    var UserModel = require("./models/user.model.js")(db, mongoose);
    var FormModel = require("./models/form.model.js")(db, mongoose);
    require("./services/user.service.js")(app, UserModel);
    require("./services/form.service.js")(app, FormModel);
    require("./services/field.service.js")(app, FormModel);
};