module.exports = function(app, mongoose, db) {
    var UserModel = require("./models/project.user.model.js")(db, mongoose);
    var OrderModel = require("./models/project.order.model.js")(db, mongoose);
    var WatchlistModel = require("./models/project.watchlist.model.js")(db, mongoose);
    var CommentModel = require("./models/project.comment.model.js")(db, mongoose);

    require("./services/project.user.service.js")(app, UserModel);
    require("./services/project.order.service.js")(app, OrderModel);
    require("./services/project.watchlist.service.js")(app, WatchlistModel);
    require("./services/project.comment.service.js")(app, CommentModel);

};