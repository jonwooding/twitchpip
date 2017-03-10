angular.module('pipApp', ['ngRoute', 'ngResource'])

	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				template: '../partials/home-partial.html'
			})

			.when('/about', {
				controller: 'AboutController',
				template: '../partials/about-partial.html'
			})

			.when('/donate', {
				controller: 'DonateController',
				template: '../partials/donate-partial.html'
			})

			.when('/contact', {
				controller: 'ContactController',
				template: '../partials/contact-partial.html'
			})

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	})

	.controller('GlobalController', ['$scope', '$http',
		function($scope, $http) {

		}
	])
	.controller('HomeController', ['$scope', '$http',
		function($scope, $http) {
			$scope.message = "i'm home";
		}
	])
	.controller('AboutController', ['$scope', '$http',
		function($scope, $http) {
			$scope.message = "i'm about";
		}
	])
	.controller('DonateController', ['$scope', '$http',
		function($scope, $http) {
			$scope.message = "i'm money";
		}
	])
	.controller('ContactController', ['$scope', '$http',
		function($scope, $http) {
			$scope.message = "contact here";
		}
	])