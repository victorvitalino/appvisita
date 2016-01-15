var app = angular.module('codhab.controllers.message', []);


/*********************************************************************
 * messageCreateCtrl
 *********************************************************************/

app.controller('messageCtrl', function($scope,
   $ionicPopup,
   $ionicLoading,
   MessageService) {

  $scope.resetFormData = function(){
    $scope.formData = {
      'title': '',
      'message': '',
      'category':''
    };
  };
  $scope.resetFormData();

  $scope.getMessage = function (form) {

    if (form.$valid){
      $ionicLoading.show();
      MessageService.send($scope.formData).then(function(){
          $scope.resetFormData();
          $ionicLoading.hide();
          form.$setPristine(true);
          $state.go("app.message");
      });
    }
  };
});
