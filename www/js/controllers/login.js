var app = angular.module('codhab.controllers.login', []);


/*********************************************************************
 * LoginCtrl
 *********************************************************************/

app.controller('LoginCtrl',function($scope, $state, AuthService, $cordovaFacebook){
    $scope.formData = {
  		"email": "",
  		"password": ""
  	};
    // Logar com form basico do Parse
    $scope.login = function (form) {
      if (form.$valid){
      console.log("LoginCtrl::login");
      AuthService.login($scope.formData.email, $scope.formData.password)
      .then(function(){
          $state.go("app.home")
      });
      }
    };
  });
  /*********************************************************************
   * SignupCtrl
   *********************************************************************/
  app.controller('SignupCtrl', function ($scope, $state, AuthService) {

  	$scope.formData = {
  		"name": "",
  		"email": "",
  		"password": ""
  	};

  	$scope.signup = function (form) {
  		if (form.$valid){

  			console.log("SignupCtrl::signup")
  			AuthService.signup($scope.formData.email,
  				$scope.formData.name,
  				$scope.formData.password)
  		} else {
  			console.log("Invalid")
  		}
  	};
  });
