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
			// Query
			var Report = Parse.Object.extend("Report");
			var reportQuery = new Parse.Query(Report);
			reportQuery.descending('created');
			reportQuery.equalTo("owner", AuthService.user);

			// Realizar Query

			reportQuery.find({
				success: function (results){
					angular.forEach(results, function(item){
						var report = new Report(item);
						self.results.push(report)
					});
					console.debug(self.results);

					//fim da lista
					if (results.length == 0){
						self.hasMore = false;
					}

					// Fim woohoo!!!!
					d.resolve();
				}
			});

			return d.promise;
		},
		'track': function (data) {
			self.isSaving = true;
			var d = $q.defer();
			// Transformar lat e o lon em float senão fode tudo. Não funciona no emulador, não sei pq pergunta pra Deus.
			lat = parseFloat(data.lat);
			lon = parseFloat(data.lon);
		  var point = new Parse.GeoPoint({latitude: lat, longitude: lon});
			var Report = Parse.Object.extend("Report");
			var user = AuthService.user;
			var file = data.picture ? new Parse.File("photo.jpg", {base64: data.picture}) : null;
			var report = new Report();
			report.set("logradouro",data.logradouro);
			report.set("cnpj", data.cnpj);
			report.set("presidente", data.presidente);
			report.set("confirmacao_endereco", data.confirmacao_endereco);
			report.set("created", new Date());
			report.set("observacoes", data.observacoes);
			report.set("celular", data.celular);
			report.set("associados", data.associados);
			report.set("associados_habitacionais", data.associados_habitacionais);
			report.set("n_ambientes", data.n_ambientes);
			report.set("sala_presi", data.sala_presi);
			report.set("sala_diretor", data.sala_diretor);
			report.set("sala_reuniao", data.sala_reuniao);
		//	report.set("assembleias", data.assembleias);
			report.set("reuniao_ordinaria", data.reuniao_ordinaria);
			report.set("reuniao_extraordinaria", data.reuniao_extraordinaria);
			report.set("vinculacao", data.vinculacao);
			report.set("owner", user);
			report.set("picture", file);
			if (lat != ''){
				report.set("localizacao",point);
			}
			report.save(null,{
					success: function(){
						console.log("Report Feito");
						self.results.unshift(report);
						$ionicPopup.alert({
							title: "Report feito com sucesso",
							subTitle: "você será redirecionado"
						})
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
