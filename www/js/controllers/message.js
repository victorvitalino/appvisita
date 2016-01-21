var app = angular.module('codhab.controllers.message', []);

/*********************************************************************
 * MessageListCtrl
 *********************************************************************/
app.controller('MessageListCtrl', function ($scope, $ionicLoading, MessageService) {

	$scope.messages = MessageService;

	$ionicLoading.show();
	$scope.messages.load().then(function () {
		$ionicLoading.hide();
	});

	$scope.refreshItems = function () {
		$scope.messages.refresh().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.nextPage = function () {
		$scope.messages.next().then(function () {
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

});

/*********************************************************************
 * messageCreateCtrl
 *********************************************************************/

app.controller('messageCtrl', function($scope,
   $ionicPopup,
   $ionicLoading,
	 $state,
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
          //$state.go("app.message");
      }).then(function(){
		          $state.go("app.messages")
		      });
    }
  };
});
