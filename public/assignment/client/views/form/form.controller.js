(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController)

    function FormController($scope, FormService, $rootScope, $location) {
        $scope.$location = $location;
        var curUser = $rootScope.user;
        if (curUser != null) {
            FormService.findAllFormsForUser(curUser._id).then(function(callforms) {
                var newForms = [];
                for (var i = 0; i < callforms.length; i++) {
                    newForms.push({
                        "_id" : callforms[i]._id,
                        "title" : callforms[i].title,
                        "userId" : callforms[i].userId,
                        "fields" : callforms[i].fields
                    });
                }
                $scope.forms = newForms;
            });
        }

        $scope.addForm = function addForm(newForm) {
            if (curUser == null) {
                alert("Please login in first.");
                $location.url("/login");
            } else if (newForm && newForm.title) {
                var createForm = {
                    "title" : newForm.title,
                    "userId" : curUser._id,
                    "fields" : newForm.fields
                };
                FormService.createFormForUser(curUser._id, createForm).then(function(sth) {
                    FormService.findAllFormsForUser(curUser._id).then(function(callforms) {
                        var newForms = [];
                        for (var i = 0; i < callforms.length; i++) {
                            newForms.push({
                                "_id" : callforms[i]._id,
                                "title" : callforms[i].title,
                                "userId" : callforms[i].userId,
                                "fields" : callforms[i].fields
                            });
                        }
                        $scope.forms = newForms;
                    });
                });
            }
        }

        $scope.deleteForm = function deleteForm(index) {
            $scope.selectedFormIndex = index;
            FormService.deleteFormById($scope.forms[index]._id).then(function(forms) {
                $scope.forms.splice(index, 1);
            });
            $rootScope.globalForm = null;
        }

        $scope.selectForm = function selectForm(index) {
            $scope.selectedFormIndex = index;
            $scope.newForm = {
                "_id": $scope.forms[index]._id,
                "userId": $scope.forms[index].userId,
                "title": $scope.forms[index].title,
                "fields": $scope.forms[index].fields
            };
            $rootScope.globalForm = $scope.newForm;
        };

        $scope.updateForm = function updateForm(newForm) {
            if (($scope.selectedFormIndex || $scope.selectedFormIndex == 0)
                    && $scope.forms[$scope.selectedFormIndex]) {
                FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id, newForm).then(function(form) {
                    $scope.forms[$scope.selectedFormIndex] = form;
                    $rootScope.globalForm = form;
                });
            }
        }
    }
})();