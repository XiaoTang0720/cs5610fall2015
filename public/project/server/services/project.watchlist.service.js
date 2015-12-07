module.exports = function(app, model) {

    app.post("/api/project/watchlist", create);
    app.get("/api/project/:id/watchlist", find);
    app.delete("/api/project/watchlist/:id", deleteWatchlist);

    function create(req, res) {
        model
            .createWatchlist(req.body)
            .then(function(watchlist) {
                res.json(watchlist);
            });
    }

    function find(req, res) {
        model
            .findAllWatchlistsForUser(req.params.id)
            .then(function(watchlists) {
                res.json(watchlists);
            });
    }

    function deleteWatchlist(req, res) {
        model
            .deleteWatchlist(req.params.id)
            .then(function(watchlist) {
                res.json(watchlist);
            });
    }
};