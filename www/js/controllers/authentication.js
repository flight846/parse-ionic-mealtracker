var app = angular.module('mealtrack.controllers.authentication', []);

/*********************************************************************
 * LoginCtrl
 *********************************************************************/
app.controller('LoginCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"email": "",
		"password": ""
	};

	$scope.login = function (form) {
		if (form.$valid) {
			console.log("LoginCtrl::login");
			AuthService.login($scope.formData.email, $scope.formData.password)
				.then(function() {
					// redirect
					$state.go('tab.meals');
				});
		} else {
			console.log("LoginCtrl::Form Invalid");
		}
	};

});

/*********************************************************************
 * SignupCtrl
 *********************************************************************/
app.controller('SignupCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"name": "",
		"email": "",
		"password": "",
		"passwordAgain": ""
	};

	$scope.signup = function (form) {
		console.log("SignupCtrl::signup");
		if (form.$valid && $scope.formData.password == $scope.formData.passwordAgain) {
			console.log("SignupCtrl::Form valid");
			AuthService.signup($scope.formData.email, $scope.formData.name, $scope.formData.password)
				.then(function() {
					// redirect
					$state.go('tab.meals');
				});
		} else {
			console.log("SignupCtrl::Form Invalid");
		}
	};

});
