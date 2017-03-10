angular.module('pipApp', ['ngRoute', 'ngResource'])

	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl: '../partials/home-partial.html'
			})

			.when('/about', {
				controller: 'AboutController',
				templateUrl: '../partials/about-partial.html'
			})

			.when('/donate', {
				controller: 'DonateController',
				templateUrl: '../partials/donate-partial.html'
			})

			.when('/contact', {
				controller: 'ContactController',
				templateUrl: '../partials/contact-partial.html'
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
			// get channels

			// temp
			var c = ['jonwooding', 'xra_', 'esl_csgo', 'esl_sc2'];

			var w = document.getElementById('player0').offsetWidth;
			var p0 = {
				width: w,
				height: w * 9 / 16,
				channel: c[0],
			};
			$scope.player0 = new Twitch.Player("player0", p0);
			$scope.player0.setVolume(0.5);
			$scope.player0.setMuted(true);
			$scope.player0.setQuality('chunked');

			w = document.getElementById('player1').offsetWidth;
			var p1 = {
				width: w,
				height: w * 9 / 16,
				channel: c[1],
			};
			$scope.player1 = new Twitch.Player("player1", p1);
			$scope.player1.setVolume(0.5);
			$scope.player1.setMuted(true);
			$scope.player1.setQuality('low');

			p1.channel = c[2];
			$scope.player2 = new Twitch.Player("player2", p1);
			$scope.player2.setVolume(0.5);
			$scope.player2.setMuted(true);
			$scope.player2.setQuality('low');

			p1.channel = c[3];
			$scope.player3 = new Twitch.Player("player3", p1);
			$scope.player3.setVolume(0.5);
			$scope.player3.setMuted(true);
			$scope.player3.setQuality('low');

			$scope.ifmo = {
				mo0: false,
				mo1: false,
				mo2: false,
				mo3: false
			}

			window.addEventListener('blur', function() {
				var channel = $scope.player0.getChannel();
				if ($scope.ifmo.mo0) {
					// do nothing
				} else if ($scope.ifmo.mo1) {
					$scope.player0.setChannel($scope.player1.getChannel());
					$scope.player1.setChannel(channel);
				} else if ($scope.ifmo.mo2) {
					$scope.player0.setChannel($scope.player2.getChannel());
					$scope.player2.setChannel(channel);
				} else if ($scope.ifmo.mo3) {
					$scope.player0.setChannel($scope.player3.getChannel());
					$scope.player3.setChannel(channel);
				}
			});

			document.getElementById('player0').addEventListener('mouseover', function() {
				$scope.ifmo.mo0 = true;
				window.focus();
			});
			document.getElementById('player0').addEventListener('mouseout', function() {
				$scope.ifmo.mo0 = false;
			});

			document.getElementById('player1').addEventListener('mouseover', function() {
				$scope.ifmo.mo1 = true;
				window.focus();
			});
			document.getElementById('player1').addEventListener('mouseout', function() {
				$scope.ifmo.mo1 = false;
			});

			document.getElementById('player2').addEventListener('mouseover', function() {
				$scope.ifmo.mo2 = true;
				window.focus();
			});
			document.getElementById('player2').addEventListener('mouseout', function() {
				$scope.ifmo.mo2 = false;
			});

			document.getElementById('player3').addEventListener('mouseover', function() {
				$scope.ifmo.mo3 = true;
				window.focus();
			});
			document.getElementById('player3').addEventListener('mouseout', function() {
				$scope.ifmo.mo3 = false;
			});

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