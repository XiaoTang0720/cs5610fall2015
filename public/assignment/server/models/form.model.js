var q = require("q");

module.exports = function(db, mongoose) {
    var FormSchema = require("./form.schema.js")(mongoose);
    var FormModel  = mongoose.model("FormModel", FormSchema);
    var api = {
        createForm : createForm,
        findAllFormsForUser : findAllFormsForUser,
        findFormById : findFormById,
        findFormByTitle : findFormByTitle,
        updateForm : updateForm,
        deleteForm : deleteForm,

        createFieldForForm : createFieldForForm,
        getFieldsForForm : getFieldsForForm,
        deleteFieldFromForm : deleteFieldFromForm
    };
    return api;

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
    }

    function createForm(form) {
        var deferred = q.defer();
        if (form.fields) {
            for (var i = 0; i < form.fields.length; i++) {
                form.fields[i]._id = guid();
            }
        }
        FormModel.create(form, function(err, response){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function findAllFormsForUser(uid) {
        var deferred = q.defer();

        FormModel.find({userId: uid}, function(err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
    }

    function findFormById(id) {
        var deferred = q.defer();

        FormModel.findById(id, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.find({title: title}, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function updateForm(formId, form) {
        var deferred = q.defer();

        FormModel.update({_id: formId}, {
            title : form.title,
            userId : form.userId,
            fields : form.fields
        }, function(err, user) {
            // update does not return form in mongodb,
            // so we need to retrieve the form and return.
            if(err) {
                deferred.reject(err);
            } else {
                FormModel.findById(formId, function(err, form){
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteForm(id) {
        var deferred = q.defer();

        FormModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }


    /* Fields related operations. */

    function createFieldForForm(formId, field) {
        var deferred = q.defer();
        field._id = guid();
        FormModel.update({_id: formId},
            {$addToSet: {fields: field}}, function(err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
        });

        return deferred.promise;
    }

    function getFieldsForForm(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();
        FormModel.update(
            {_id: formId},
            {$pop: {fields: {_id : fieldId}}},
            function(err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });

        return deferred.promise;
    }
}