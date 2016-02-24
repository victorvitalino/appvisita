// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('codhab', ['ionic',
'ngCordova',
'ngMessages',
'angularMoment',
'parse-angular',
'parse-angular.enhance',
'codhab.controllers.app',
'codhab.controllers.map',
'codhab.controllers.message',
'codhab.controllers.login',
'codhab.controllers.report',
'codhab.services.auth',
'codhab.services.ReportService',
'codhab.services.MessageService'
])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
;

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    Parse.initialize("IwSJQSH8F3LY5kO4ITNN9FBg9DZzjRu2CMNOYver", "YAIoNghlxEfe2MctJtMKGhqf4mkR6HTL1b9Ql20A");

      window.fbAsyncInit = function() {
          Parse.FacebookUtils.init({
              appId      : '1248184141874382',
              version    : 'v2.3',
              xfbml      : true
          });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

  });
});

app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider, $cordovaFacebookProvider) {
	$stateProvider
    .state('signup',{
      url: "/signup",
      templateUrl:"views/login/signup.html",
      controller: 'SignupCtrl'
    })
    .state('login',{
      url: "/login",
      templateUrl:"views/login/login.html",
      controller: 'LoginCtrl'
    })
    .state('report',{
      url: "/report",
      templateUrl: "views/app/report/report.html",
      controller: 'reportCreateCtrl'
    })
	;

    //   $ionicConfigProvider.tabs.position('bottom')
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});
