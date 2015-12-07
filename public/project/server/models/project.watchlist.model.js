var q = require("q");

module.exports = function(db, mongoose) {
    var WatchlistSchema = require("./project.watchlist.schema.js")(mongoose);
    var WatchlistModel  = mongoose.model("ProjectWatchlistModel", WatchlistSchema);
    var api = {
        createWatchlist : createWatchlist,
        findAllWatchlistsForUser : findAllWatchlistsForUser,
        deleteWatchlist : deleteWatchlist
    };
    return api;

    function createWatchlist(watchlist) {
        var deferred = q.defer();
        WatchlistModel.create(watchlist, function(err, watchlist) {
            console.log(err);
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(watchlist);
            }
        });

        return deferred.promise;
    }

    function findAllWatchlistsForUser(uid) {
        var deferred = q.defer();

        WatchlistModel.find({userId: uid}, function(err, watchlists){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(watchlists);
            }
        });

        return deferred.promise;
    }

    function deleteWatchlist(id) {
        var deferred = q.defer();

        WatchlistModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
}