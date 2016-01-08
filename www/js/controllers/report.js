var app = angular.module('codhab.controllers.report', []);

/*********************************************************************
 * reportCre.ateCtrl
 *********************************************************************/

app.controller('reportCreateCtrl', function ($scope,
   $state,
   $ionicPopup,
   $ionicLoading,
   $cordovaCamera,
   $cordovaGeolocation,
   ReportService) {

     $scope.resetFormData = function(){
       $scope.formData = {
         'title': '',
         'lat': '',
         'picture': null
       };
     };
     $scope.resetFormData();

     $scope.trackReport = function (form) {

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

     $scope.addGeoLocation = function (){
       $cordovaGeolocation.getCurrentPosition({timeout:10000, enableHighAccuracy:false})
       .then(function(position){
      	$scope.formData.lat = position.coords.latitude;
        $scope.formData.lon = position.coords.longitude;
        console.log($scope.formData.lat);
      }, function (err){
        console.log(err);
      });
     }

     $scope.addPicture = function () {
       var options = {
         quality: 50,
         destinationType: Camera.DestinationType.DATA_URL,
         sourceType: Camera.PictureSourceType.CAMERA, // Mudar para CAMERA, quando for para produção e PHOTOLIBRARY para desenvolvimento
         allowEdit: true,
         encodingType: Camera.EncodingType.JPEG,
         targetWidth: 480,
         popoverOptions: CameraPopoverOptions,
         saveToPhotoAlbum: false
       };

       $cordovaCamera.getPicture(options).then(function(imageData){
         $scope.formData.picture = imageData;
       }, function (err){
         console.log(err);
         $ionicPopup.alert({
           title:'Erro ao capturar foto',
           subTitle:'Tente novamente mais tarde.'
         });
       });

       //TODO
     };
});
