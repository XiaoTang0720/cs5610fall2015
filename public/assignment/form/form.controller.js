(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController)

    function FormController($scope, FormService, $rootScope, $location) {
        $scope.$location = $location;
        var curUser = $rootScope.user
        if (curUser != null) {
            FormService.findAllFormsForUser(curUser.userid, function(forms) {
                $scope.forms = forms;
            });
        }

        $scope.addForm = function addForm(newForm) {
            if (newForm != null) {
                FormService.createFormForUser(curUser.userid, newForm, function(newform) {
                    $scope.forms.push(newform);
                });
            }
        }

        $scope.deleteForm = function deleteForm(index) {
            $scope.selectedFormIndex = index;
            FormService.deleteFormById($scope.forms[index].formid, function(forms) {
                $scope.forms.splice(index, 1);
            });
        }

        $scope.selectForm = function selectForm(index) {
            $scope.selectedFormIndex = index;
            $scope.newForm = {
            formid: $scope.forms[index].formid,
            userid: $scope.forms[index].userid,
            formName: $scope.forms[index].formName
        };

        $scope.updateForm = function updateForm(newForm) {
            FormService.updateFormById($scope.forms[$scope.selectedFormIndex].formid, newForm, function(form) {
                    $scope.forms[$scope.selectedFormIndex] = form;
            });
        }
      }
    }
})();