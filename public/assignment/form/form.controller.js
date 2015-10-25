(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController) 

	function FormController($scope, FormService, $rootScope, $location)
    {   
        $scope.$location = $location;
        var curUser = $rootScope.user
        if (curUser != null) {
            FormService.findAllFormsForUser(curUser.userid, function(forms) {
                $scope.forms = forms;
                console.log(forms);
            });
        }
        
      $scope.addForm = function addForm(newForm)
      {
        FormService.createFormForUser(curUser.userid, newForm, function(newform) {
            $scope.forms.push(newform);
        });
      
      }
      $scope.deleteForm = function deleteForm(index) 
      {
        $scope.selectedFormIndex = index;
        FormService.deleteFormById($scope.forms[index].formid, function(forms) {
            $scope.forms.splice(index, 1);
        }); 
          
      }
    }
      
})();