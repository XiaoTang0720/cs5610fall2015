(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        function createFormForUser(userId, form, callback) {
            var newForm = {formid: guid(),
                            userid: userId,
                            formName: form.formName}
            forms.push(newForm);
            console.log("successfully add a new form in forms " + forms);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var result = [];
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].userid == userId) {
                    result.push(forms[i]);
                }
            }
            callback(result);
        }

        function deleteFormById(formId, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].formid == formId) {
                    forms.splice(i, 1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var updateForm = null;
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].formid == formId) {
                    forms[i].userid = newForm.userid;
                    forms[i].formName = newForm.formName;
                    updateForm = forms[i];
                }
            }
            callback(updateForm);
        }
    }
})();