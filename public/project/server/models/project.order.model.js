var q = require("q");

module.exports = function(db, mongoose) {
    var OrderSchema = require("./project.order.schema.js")(mongoose);
    var OrderModel  = mongoose.model("ProjectOrderModel", OrderSchema);
    var api = {
        createOrder : createOrder,
        findAllOrdersForUser : findAllOrdersForUser,
        deleteOrder : deleteOrder,
        deleteAllOrderForUser : deleteAllOrderForUser
    };
    return api;

    function createOrder(order) {
        var deferred = q.defer();
        OrderModel.create(order, function(err, order) {
            console.log(err);
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(order);
            }
        });

        return deferred.promise;
    }

    function findAllOrdersForUser(uid) {
        var deferred = q.defer();

        OrderModel.find({userId: uid}, function(err, orders){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(orders);
            }
        });

        return deferred.promise;
    }

    function deleteOrder(id) {
        var deferred = q.defer();

        OrderModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    function deleteAllOrderForUser(id) {
        var deferred = q.defer();

        OrderModel.remove({userId: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

}