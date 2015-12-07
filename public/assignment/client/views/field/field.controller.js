(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController)

    function FieldController($scope, FieldService, $rootScope, $location) {
        $scope.$location = $location;
        var curForm = $rootScope.globalForm;

        if (curForm == null) {
            alert("Please choose a form first.");
            $location.url("/form");
        } else {
            FieldService.getFieldsForForm(curForm._id).then(function(form) {
                var newFields = [];
                if (form && form.fields) {
                    for (var i = 0; i < form.fields.length; i++) {
                        newFields.push({
                            "_id" : form.fields[i]._id,
                            "label" : form.fields[i].label,
                            "fieldType" : form.fields[i].fieldType,
                            "placeholder" : form.fields[i].placeholder,
                            "options" : form.fields[i].options
                        });
                    }
                }
                $scope.fields = newFields;
            });
        }

        $scope.addField = function addField(newField) {
            if (curForm == null) {
                alert("Please choose one form first.");
                $location.url("/form");
            } else if (newField && newField.fieldType && newField.label) {
                var createdField = {label: newField.label, fieldType: newField.fieldType};
                if (createdField.fieldType == "text") {
                    createdField.placeholder = newField.placeholder;
                } else if (createdField.fieldType == "radio"
                    || createdField.fieldType == "checkbox"
                    || createdField.fieldType == "select") {
                    var newOptions = [];
                    if (newField.options) {
                        var newArray = newField.options.split("|");
                        for(var i = 0; i < newArray.length; i++) {
                            newOptions.push({
                                "label" : newArray[i],
                                "value" : newArray[i]
                            });
                        }
                        createdField.options = newOptions;
                    }
                }

                FieldService.createFieldForForm(curForm._id, createdField).then(function(sth) {
                    FieldService.getFieldsForForm(curForm._id).then(function(form) {
                        var newFields = [];
                        if (form && form.fields) {
                            for (var i = 0; i < form.fields.length; i++) {
                                newFields.push({
                                    "_id" : form.fields[i]._id,
                                    "label" : form.fields[i].label,
                                    "fieldType" : form.fields[i].fieldType,
                                    "placeholder" : form.fields[i].placeholder,
                                    "options" : form.fields[i].options
                                });
                            }
                        }
                        $scope.fields = newFields;
                    });
                });
            }
        }

        $scope.deleteField = function deleteField(index) {
            if (curForm == null) {
                alert("Please choose one form first.");
                $location.url("/form");
            } else {
                FieldService.deleteFieldFromForm(curForm._id, $scope.fields[index]._id).then(function(fields) {
                    $scope.fields.splice(index, 1);
                });
            }
        }
    }
})();