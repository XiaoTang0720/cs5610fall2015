var mock = require("../data/form.mock.json");

module.exports = function() {
    var api = {
        createForm : createForm,
        findAllFormsForUser : findAllFormsForUser,
        findFormById : findFormById,
        findFormByTitle : findFormByTitle,
        updateForm : updateForm,
        deleteForm : deleteForm,
        createField : createField,
        findAllFieldsForForm : findAllFieldsForForm,
        findFieldById : findFieldById,
        updateField : updateField,
        deleteField : deleteField
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

    function createForm(uid, form) {
        if (form != null) {
            mock.push({
                "id" : guid(),
                "title" : form.title,
                "userId" : uid,
                "fields" : form.fields
            });
            return findAllFormsForUser(uid);
        }
    }

    function findAllFormsForUser(uid) {
        var newMock = [];
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].userId == uid) {
                newMock.push(mock[i]);
            }
        }
        return newMock;
    }

    function findFormById(id) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == id) {
                return mock[i];
            }
        }
    }

    function findFormByTitle(title) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].title == title) {
                return mock[i];
            }
        }
    }

    function updateForm(formId, form) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == formId) {
                if (form.title != null) {
                    mock[i].title = form.title;
                }
                if (form.userId != null) {
                    mock[i].userId = form.userId;
                }
                if (form.fields != null) {
                    mock[i].fields = form.fields;
                }
                return mock[i];
            }
        }
    }

    function deleteForm(id) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == id) {
                mock.splice(i, 1);
                return mock;
            }
        }
    }


    /* Fields related operations. */
    function createField(formId, field) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == formId) {
                var newOptionArray = [];
                if (field.options) {
                    var newOptions = field.options.split("|");
                    for (var j = 0; j < newOptions.length; j++) {
                        newOptionArray.push({
                            "label" : newOptions[j],
                            "value" : newOptions[j]
                        });
                    }
                }
                if (mock[i].fields) {
                    mock[i].fields.push({
                        "id" : guid(),
                        "label" : field.label,
                        "type" : field.type,
                        "placeholder" : field.placeholder,
                        "options" : newOptionArray
                    });
                } else {
                    var newFields = [];
                    newFields.push({
                        "id" : guid(),
                        "label" : field.label,
                        "type" : field.type,
                        "placeholder" : field.placeholder,
                        "options" : newOptionArray
                    });
                    mock[i].fields = newFields;
                }
                return mock[i].fields;
            }
        }
    }

    function findAllFieldsForForm(formId) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == formId) {
                return mock[i].fields;
            }
        }
    }

    function findFieldById(formId, fieldId) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == formId && mock[i].fields != null) {
                for (var j = 0; j < mock[i].fields.length; j++) {
                    if (mock[i].fields[j].id == fieldId) {
                        return mock[i].fields[j];
                    }
                }
            }
        }
    }

    function updateField(formId, fieldId, field) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == formId && mock[i].fields != null) {
                for (var j = 0; j < mock[i].fields.length; j++) {
                    if (mock[i].fields[j].id == fieldId) {
                        if (field.label != null) {
                            mock[i].fields[j].label = field.label;
                        }
                        if (field.type != null) {
                            mock[i].fields[j].type = field.type;
                        }
                        if (field.placeholder != null) {
                            mock[i].fields[j].placeholder = field.placeholder;
                        }
                        if (field.options != null) {
                            mock[i].fields[j].options = field.options;
                        }
                        return mock[i].fields;
                    }
                }
            }
            return mock[i];
        }
    }

    function deleteField(formId, fieldId) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == formId && mock[i].fields != null) {
                for (var j = 0; j < mock[i].fields.length; j++) {
                    if (mock[i].fields[j].id == fieldId) {
                        mock[i].fields.splice(j, 1);
                        return mock[i].fields;
                    }
                }
            }
        }
    }
}