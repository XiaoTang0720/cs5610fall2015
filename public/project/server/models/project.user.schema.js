module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        isAdmin: {type: Boolean, default: false},
        username: {type: String, required: true},
        password: {type: String, requried: true},
        following: {type: [String], default: []},
        followed: {type: [String], default: []}
    }, {collection: "cs5610.project.user"});
    return UserSchema;
};