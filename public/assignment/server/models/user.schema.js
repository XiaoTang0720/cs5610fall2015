module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        username: {type: String, required: true},
        password: {type: String, requried: true}
    }, {collection: "cs5610.assignment.user"});
    return UserSchema;
};