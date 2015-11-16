(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController)

    function FormController($scope, FormService, $rootScope, $location) {
        $scope.$location = $location;
        var curUser = $rootScope.user;
        if (curUser != null) {
            FormService.findAllFormsForUser(curUser.id).then(function(callforms) {
                var newForms = [];
                for (var i = 0; i < callforms.length; i++) {
                    newForms.push({
                        "id" : callforms[i].id,
                        "title" : callforms[i].title,
                        "userId" : callforms[i].userId
                    });
                }
                $scope.forms = newForms;
            });
        }

        $scope.addForm = function addForm(newForm) {
            if (curUser == null) {
                alert("Please login in first.");
            } else if (newForm != null) {
                FormService.createFormForUser(curUser.id, newForm).then(function(callforms) {
                    var newForms = [];
                    for (var i = 0; i < callforms.length; i++) {
                        newForms.push({
                            "id" : callforms[i].id,
                            "title" : callforms[i].title,
                            "userId" : callforms[i].userId
                        });
                    }
                    $scope.forms = newForms;
                });
            }
        }

        $scope.deleteForm = function deleteForm(index) {
            $scope.selectedFormIndex = index;
            FormService.deleteFormById($scope.forms[index].id).then(function(forms) {
                $scope.forms.splice(index, 1);
            });
            $rootScope.form = null;
        }

        $scope.selectForm = function selectForm(index) {
            $scope.selectedFormIndex = index;
            $scope.newForm = {
                "id": $scope.forms[index].id,
                "userId": $scope.forms[index].userId,
                "title": $scope.forms[index].title
            };
            $rootScope.form = $scope.newForm;
        };

        $scope.updateForm = function updateForm(newForm) {
            if ($scope.selectedFormIndex || $scope.selectedFormIndex == 0) {
                FormService.updateFormById($scope.forms[$scope.selectedFormIndex].id, newForm).then(function(form) {
                    $scope.forms[$scope.selectedFormIndex] = form;
                });
            }
        }
    }
})();