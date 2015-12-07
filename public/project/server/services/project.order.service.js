module.exports = function(app, model) {

    app.post("/api/project/order", create);
    app.get("/api/project/:id/order", find);
    app.delete("/api/project/order/:id", deleteOrder);
    app.delete("/api/project/:id/order", deleteAllOrderForUser);


    function create(req, res) {
        model
            .createOrder(req.body)
            .then(function(order) {
                res.json(order);
            });
    }

    function find(req, res) {
        model
            .findAllOrdersForUser(req.params.id)
            .then(function(orders) {
                res.json(orders);
            });
    }

    function deleteOrder(req, res) {
        model
            .deleteOrder(req.params.id)
            .then(function(order) {
                res.json(order);
            });
    }

    function deleteAllOrderForUser(req, res) {
        model
            .deleteAllOrderForUser(req.params.id)
            .then(function(order) {
                res.json(order);
            });
    }
};