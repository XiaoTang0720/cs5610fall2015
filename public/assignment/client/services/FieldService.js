(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", fieldService);

    function fieldService($http, $q) {
        var service = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm : getFieldsForForm,
            deleteFieldFromForm : deleteFieldFromForm
        };
        return service;

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/form/" + formId + "/field", field)
                .success(function(response) {
                   deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();