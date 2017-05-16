var app = angular.module('mealtrack.services.authentication', []);

app.service('AuthService', function ($q, $ionicPopup) {
	var self = {
		user: Parse.User.current(),
		login: function (email, password) {
			var d = $q.defer();

			Parse.User.logIn(email, password, {
				success: function(user) {
					console.log('Login Sucessful!');
					self.user = user;
					// resolve the promise after success
					d.resolve(self.user);
				},
				error: function(user, error) {
					// show ionic popup
					$ionicPopup.alert({
						title: 'Log In Error',
						subTitle: error.message,
					});

					d.reject(error);
				}
			})

			return d.promise;
		},
		signup: function (email, name, password) {
			var d = $q.defer();

			// create a new parse user
			var user = new Parse.User();
			user.set('username', email);
			user.set('name', name);
			user.set('password', password);
			user.set('email', email);

			// create on parse database
			user.signUp(null, {
				success: function(user) {
					console.log('Account created!');
					self.user = user;
					// resolve the promise after success
					d.resolve(self.user);
				},
				error: function(user, error) {
					// show ionic popup
					$ionicPopup.alert({
						title: 'Sign Up Error',
						subTitle: error.message,
					});

					d.reject(error);
				}
			})

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
