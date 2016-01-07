var app = angular.module('codhab.services.ReportService', []);

app.service("ReportService", function ($q, AuthService, $cordovaGeolocation, $ionicPopup) {
	var self = {
		'page': 0,
		'page_size': '20',
		'isLoading': false,
		'isSaving': false,
		'hasMore': true,
		'results': [],
		'refresh': function () {
			self.page = 0;
			self.isLoading = false;
			self.isSaving = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var d = $q.defer();
			return d.promise;
		},
		'track': function (data) {
			self.isSaving = true;
			var d = $q.defer();
		//	var lat = data.lat;
			// if (typeof data.lat === "number") {
			// 	lat = data.lat;
			// }
			// else {
			// 		lat = parseFloat(data.lat);
			// 		// this could return NaN
			// }
			//
			// if (typeof data.lon === "number") {
			// 		lon = data.lon;
			// }
			// else {
			// 		lon = parseFloat(data.lon);
			// }
			lat = parseFloat(data.lat);
			lon = parseFloat(data.lon);
		  var point = new Parse.GeoPoint({latitude: lat, longitude: lon});
			var Report = Parse.Object.extend("Report");
			var user = AuthService.user;
			var file = data.picture ? new Parse.File("photo.jpg", {base64: data.picture}) : null;
			var report = new Report();
			report.set("owner", user);
			report.set("picture", file);
			report.set("title", data.title);
			report.set("created", new Date());
			report.set("location", point);
		//	report.set("fuck",lat);
			report.save(null,{
					success: function(){
						console.log("Report Feito");
						self.results.unshift(report);
						d.resolve(report);
					},
					error: function(item,error){
						$ionicPopup.alert({
							title: "Erro ao reportar obra",
							subTitle: error.message
						})
						d.reject(error);
					}
			});


			return d.promise;
		}

	};

	return self;
});
