var app = angular.module('codhab.controllers.report', []);

/*********************************************************************
 * reportCre.ateCtrl
 *********************************************************************/

app.controller('reportCreateCtrl', function ($scope,
   $state,
   $ionicPopup,
   $ionicLoading,
   $cordovaCamera,
   ReportService) {

     $scope.resetFormData = function(){
       $scope.formData = {
         'title': '',
         'location': '',
         'picture': null,
         'category': null
       };
     };
     $scope.resetFormData();

     $scope.trackReport = function (form) {

       if (form.$valid){
         console.log("MealCreateCtrl::trackMeal");

           $ionicLoading.show();
           ReportService.track($scope.formData).then(function(){
           $scope.resetFormData();
           $ionicLoading.hide();
           $state.go("app.report");
         });
       }
     };

     $scope.addPicture = function () {
       var options = {
         quality: 50,
         destinationType: Camera.DestinationType.DATA_URL,
         sourceType: Camera.PictureSourceType.PHOTOLIBRARY, // Mudar para CAMERA, quando for para produção e PHOTOLIBRARY para desenvolvimento
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
