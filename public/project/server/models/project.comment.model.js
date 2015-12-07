var q = require("q");

module.exports = function(db, mongoose) {
    var CommentSchema = require("./project.comment.schema.js")(mongoose);
    var CommentModel  = mongoose.model("ProjectCommentModel", CommentSchema);
    var api = {
        createComment : createComment,
        findAllCommentsForMovie : findAllCommentsForMovie,
    };
    return api;

    function createComment(comment) {
        var deferred = q.defer();
        CommentModel.create(comment, function(err, comment) {
            console.log(err);
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(comment);
            }
        });

        return deferred.promise;
    }

    function findAllCommentsForMovie(idIMDB) {
        var deferred = q.defer();

        CommentModel.find({idIMDB: idIMDB}, function(err, comments){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(comments);
            }
        });

        return deferred.promise;
    }
}