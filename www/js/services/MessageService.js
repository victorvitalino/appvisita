var app = angular.module('codhab.services.MessageService', []);

app.service("MessageService", function ($q, AuthService, $ionicPopup) {
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
		'send': function (data) {
			self.isSaving = true;
			var d = $q.defer();
			var Message = Parse.Object.extend("Message");
			var user = AuthService.user;
			var message = new Message();
			message.set("owner", user);
			message.set("title", data.title);
			message.set("category", data.category)
			message.set("created", new Date());

			message.save(null,{
					success: function(){
						console.log("Report Feito");
						self.results.unshift(message);
						d.resolve(message);
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
