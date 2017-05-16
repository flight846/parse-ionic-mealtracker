var app = angular.module('mealtrack.controllers.meals', []);


/*********************************************************************
 * MealListCtrl
 *********************************************************************/
app.controller('MealListCtrl', function ($scope, $ionicLoading, MealService) {

	$scope.meals = MealService;

	// $ionicLoading.show();
	$scope.meals.load().then(function () {
		// $ionicLoading.hide();
	});

	$scope.refreshItems = function () {
		$scope.meals.refresh().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.nextPage = function () {
		$scope.meals.next().then(function () {
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

});

/*********************************************************************
 * MealCreateCtrl
 *********************************************************************/
app.controller('MealCreateCtrl', function ($scope, $state, $ionicPopup, $ionicLoading, $cordovaCamera, MealService) {

	$scope.resetFormData = function () {
		$scope.formData = {
			'title': '',
			'category': '',
			'calories': 29,
			'picture': null
		};
	};
	$scope.resetFormData();


	$scope.trackMeal = function (form) {
		console.log("MealCreateCtrl::trackMeal");
		//TODO
	};

	$scope.addPicture = function () {
		// cordovaCamera plugin options
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY, // CAMERA || PHOTOLIBRARY
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 480,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: true
		};

		$cordovaCamera.getPicture(options)
			.then(function(imageData) {
				// save to formData
	      		$scope.formData.picture = imageData;
    		}, function(err) {
	      		// error
				$ionicPopup.alert({
					title: 'Error getting picture',
					subTitle: 'We had a proble, trying to get that picture, please try again.'
				})
	    	});



	};

});
