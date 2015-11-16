(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController)

    function FieldController($scope, FieldService, $rootScope, $location) {
        $scope.$location = $location;
        var curForm = $rootScope.form;

        if (curForm == null) {
            alert("Please choose a form first.");
        } else {
            FieldService.getFieldsForForm(curForm.id).then(function(callFields) {
                var newFields = [];
                for (var i = 0; i < callFields.length; i++) {
                    newFields.push({
                        "id" : callFields[i].id,
                        "label" : callFields[i].label,
                        "type" : callFields[i].type,
                        "placeholder" : callFields[i].placeholder,
                        "options" : callFields[i].options
                    });
                }
                $scope.fields = newFields;
            });
        }

        $scope.addField = function addField(newField) {
            if (curForm == null) {
                alert("Please choose one form first.");
            } else {
                FieldService.createFieldForForm(curForm.id, newField).then(function(callFields) {
                    var newFields = [];
                    for (var i = 0; i < callFields.length; i++) {
                        newFields.push({
                            "id" : callFields[i].id,
                            "label" : callFields[i].label,
                            "type" : callFields[i].type,
                            "placeholder" : callFields[i].placeholder,
                            "options" : callFields[i].options
                        });
                    }
                    $scope.fields = newFields;
                });
            }
        }

        $scope.deleteField = function deleteField(index) {
            if (curForm == null) {
                alert("Please choose one form first.");
            } else {
                FieldService.deleteFieldFromForm(curForm.id, $scope.fields[index].id).then(function(fields) {
                    $scope.fields.splice(index, 1);
                });
            }
        }
    }
})();