var app = angular.module('codhab.services.auth', []);

app.service('AuthService', function ($q, $ionicPopup) {
	var self = {
		user: null,
		login: function (email, password) {
			var d = $q.defer();

			Parse.User.logIn(email, password,{
				success: function(user){
					console.log("Logado");
					self.user = user;
					d.resolve(self.user);
				},
				error: function(user, error){
					$ionicPopup.alert({
						title: "Erro ao Logar",
						subTitle: error.message
					});
					d.reject(error);
				}
			});

			return d.promise;
		},
		signup: function (email, name, cpf, password) {

			// Verifica se o usuário esta logado.
			var currentUser = Parse.User.current();
							 if (currentUser) {
									 Parse.User.logOut();
							 }


			var d = $q.defer();
			var user = new Parse.User();
			user.set('username', email);
			user.set('name',name);
			user.set('cpf',cpf);
			user.set('password',password);
			user.set('email',email);

			user.signUp(null,{
				success: function(user){
					console.log("Conta Criada");
					self.user = user;
					d.resolve(self.user);
				},
				error: function(user, error){
					$ionicPopup.alert({
						title: "Erro ao Cadastrar",
						subTitle: error.message
					});
					d.reject(error);
				}
			});
			return d.promise;
		},
		'update': function (data)  {
			var d = $q.defer();

			//TODO

			return d.promise;
		}

	};

	return self;
});
