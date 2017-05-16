var app = angular.module('mealtrack.services.meals', []);

app.service("MealService", function ($q, $ionicPopup, AuthService) {
	var self = {
		'page': 0,
		'page_size': 20,
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

			// Initialise query
			var Meal = Parse.Object.extend('Meal'); // meal table
			var mealQuery = new Parse.Query(Meal);
			mealQuery.descending('created'); // result in order of creation
			mealQuery.equalTo('owner', AuthService.user); // query where meals belongs to current user

			// pagination
			mealQuery.skip(self.page * self.page_size); // skip (page 1 * 20 records)
			mealQuery.limit(self.page_size); // 20

			// perform the query
			mealQuery.find({
				success: function(results) {
					angular.forEach(results, function (item) {
  						self.results.push(item)
					});
					console.debug(self.results);

					// check if end of query list
					if (results.length == 0) {
						self.hasMore = false;
					}

					// done querying
					d.resolve();
				}
			})

			return d.promise;
		},
		'track': function (data) {
			self.isSaving = true;
			var d = $q.defer();

			// create new Parse Object table
			var Meal = Parse.Object.extend('Meal');

			// get current user
			var user = AuthService.user;

			// save picture file as url
			var file = data.picture ? new Parse.File('photo.jpg', { base64: data.picture }) : null;

			// create new row in Meal object table
			var meal = new Meal();

			// parse Meal object properties
			meal.set('owner', user);
			meal.set('picture', file);
			meal.set('title', data.title);
			meal.set('category', data.category);
			meal.set('calories', parseInt(data.calories));
			meal.set('created', new Date());

			// save to Parse
			meal.save(null, {
				success: function(meal) {
					console.log('Meal created!');
					self.results.unshift(meal);
					d.resolve(meal);
				},
				error: function(item, error) {
					$ionicPopup.alert({
						title: 'Error saving meal',
						subTitle: error.message
					});
					d.reject(error);
				}
			});


			return d.promise;
		}

	};

	return self;
});
