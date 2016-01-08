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
'codhab.services.ReportService'
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

    Parse.initialize("0nHHDsgXpUZieEkv46JhEKgk8fXUkKn8aDNpyqZP", "r4pMXbjMUVCrqcSzh25W1J1U3yJ5U4rjG6kdCwry");

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

app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,  $cordovaFacebookProvider) {
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
		.state('app', {
			url: "/app",
      abstract: true,
			templateUrl: "views/app/side.html"
		})
    .state('app.home', {
      url: "/home",
      views:{
        'home':{
          templateUrl: "views/app/home.html",
          controller: 'AppCtrl'
        }
      }
    })
    .state('app.message',{
      url: "/message",
      views:{
        'home':{
          templateUrl: "views/app/message/message.html",
          controller: 'messageCtrl'
        }
      }
    })
    .state('app.map',{
      url: "/map",
      views:{
        'home':{
          templateUrl: "views/app/map/map.html",
          controller: 'MapCtrl'
        }
      }
    })
    .state('app.report',{
      url: "/report",
      views:{
        'home':{
          templateUrl: "views/app/report/report.html",
          controller: 'reportCreateCtrl'
        }
      }
    })
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "views/app/tabs.html"
    })
	;

    //   $ionicConfigProvider.tabs.position('bottom')
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});
