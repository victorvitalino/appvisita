var app = angular.module('codhab.controllers.message', []);


/*********************************************************************
 * messageCreateCtrl
 *********************************************************************/

app.controller('messageCtrl', function($scope, $state) {

  $scope.resetFormData = function(){
    $scope.formData = {
      'title': '',
      'message': '',
      'category':''
    };
  };
  $scope.resetFormData();

  $scope.getMenssage = function (form) {

    if (form.$valid){
      $ionicLoading.show();
      ReportService.track($scope.formData).then(function(){
          $scope.resetFormData();
          $ionicLoading.hide();
          form.$setPristine(true);
          $state.go("app.report");
      });
    }
  };
});
