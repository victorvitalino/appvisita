var app = angular.module('codhab.services.MessageService', []);

app.service("MessageService", function ($q, AuthService, $ionicPopup) {
	var self = {
		'page': 0,
		'page_size': 20,
		'objectId':'',
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
			//self.results = [];
			self.isLoading = true;
			var d = $q.defer();
			// Query
			//var Message = Parse.Object.extend("Message");
			var messageQuery = new Parse.Query('Message');
			messageQuery.descending('created');
			messageQuery.equalTo("owner", AuthService.user);

			//Paginar
		//	messageQuery.skip(self.page * self.page_size);
		//	messageQuery.limit(self.page_size);

			// Realizar Query
			messageQuery.find({
				success: function (results){
					angular.forEach(results, function(item){
				//	var message = new Message(item);
					self.results = results
					});
					console.debug(results);

					//fim da lista
					// if (results.length == 0){
					// 	self.hasMore = false;
					// }

					// Fim woohoo!!!!
					d.resolve();
				}
			});

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
			message.set("category", data.category);
      message.set("message", data.message);
			message.set("created", new Date());
			message.set("status", "Recebida")

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
