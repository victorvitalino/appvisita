var app = angular.module('codhab.controllers.login', []);


/*********************************************************************
 * LoginCtrl
 *********************************************************************/

app.controller('LoginCtrl',function($scope, $state, AuthService){
  $scope.formData = {
		"email": "",
		"password": ""
	};
  $scope.login = function (form) {
    if (form.$valid){
    console.log("LoginCtrl::login");
    AuthService.login($scope.formData.email, $scope.formData.password)
    }
  };
  // $scope.signupForm = function(){
  //   //Cria um novo usuário no Parse chamando seu objeto
  //   var user = new Parse.User();
  //   user.set("username",$scope.data.username);
  //   user.set("password",$scope.data.password);
  //   user.set("email",$scope.data.email);
  //
  //   user.set ("algumacoisa", "testedealgumacoisa");
  //
  //   user.signUp(null,{
  //     success: function(user){
  //       alert("success!");
  //   },
  //   error: function(user,error){
  //     alert("Error:" + error.code + " " + error.message);
  //     }
  //   });
  //
  // };
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
