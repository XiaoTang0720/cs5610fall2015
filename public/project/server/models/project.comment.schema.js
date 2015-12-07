module.exports = function(mongoose) {
    var CommentSchema = mongoose.Schema({
        idIMDB: String,
        message: String,
        userId: String,
        username: String,
        firstname: String,
        lastname: String,
        time: String
    }, {collection: "cs5610.project.comment"});
    return CommentSchema;
};