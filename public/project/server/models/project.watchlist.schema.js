module.exports = function(mongoose) {
    var WatchlistSchema = mongoose.Schema({
        idIMDB: String,
        title: String,
        userId: String
    }, {collection: "cs5610.project.watchlist"});
    return WatchlistSchema;
};