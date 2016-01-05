var app = angular.module('codhab.services.ReportService', []);

app.service("ReportService", function ($q, AuthService) {
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

			//TODO

			return d.promise;
		},
		'track': function (data) {
			self.isSaving = true;
			var d = $q.defer();

			var Report = Parse.Object.extend("Report");
			var user = AuthService.user;
			var file = data.picture ? new Parse.File("photo.jpg", {base64: data.picture}) : null;


			var report = new Report();
			report.set("owner", user);
			report.set("picture", file);
			report.set("title", data.title);
			report.set("created", new Date());

			report.save(null,{
					success: function(){
						console.log("Report Feito");
						self.results.unshift(report)
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
