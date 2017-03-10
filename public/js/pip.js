angular.module('pipApp', ['ngRoute', 'ngResource'])

	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home', {
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
			requiteBase: false
		});
	})

	.controller('GlobalController', ['$scope',
		function($scope) {

		}
	])
	.controller('HomeController', ['$scope',
		function($scope) {
			$scope.message = "i'm home";
		}
	])
	.controller('AboutController', ['$scope',
		function($scope) {
			$scope.message = "i'm about";
		}
	])
	.controller('DonateController', ['$scope',
		function($scope) {
			$scope.message = "i'm money";
		}
	])
	.controller('ContactController', ['$scope',
		function($scope) {
			$scope.message = "contact here";
		}
	])