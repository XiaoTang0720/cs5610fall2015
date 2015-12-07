module.exports = function(mongoose) {
    var OrderSchema = mongoose.Schema({
        idIMDB: String,
        title: String,
        price: String,
        userId: String
    }, {collection: "cs5610.project.order"});
    return OrderSchema;
};