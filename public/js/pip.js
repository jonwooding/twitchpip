angular.module('pipApp', ['ngRoute', 'ngResource', 'ngMaterial', 'ngMessages'])

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

			$scope.tab_index = 0;

			$scope.next = function() {
				$scope.tab_index = Math.min($scope.tab_index + 1, 1);
			};

			$scope.previous = function() {
				$scope.tab_index = Math.max($scope.tab_index - 1, 0);
			};

			var w = document.getElementById('player0').offsetWidth;
			var p0 = {
				width: w,
				height: w * 9 / 16,
				channel: '',
			};
			$scope.player0 = new Twitch.Player("player0", p0);
			$scope.player0.setVolume(0.5);
			$scope.player0.setMuted(true);
			$scope.player0.setQuality('chunked');

			var p1element = document.getElementById('player1');
			if (p1element) {
				w = document.getElementById('player1').offsetWidth;
				var p1 = {
					width: w,
					height: w * 9 / 16,
					channel: '',
				};
				$scope.player1 = new Twitch.Player("player1", p1);
				$scope.player1.setVolume(0.5);
				$scope.player1.setMuted(true);
				$scope.player1.setQuality('low');

				$scope.player2 = new Twitch.Player("player2", p1);
				$scope.player2.setVolume(0.5);
				$scope.player2.setMuted(true);
				$scope.player2.setQuality('low');

				$scope.player3 = new Twitch.Player("player3", p1);
				$scope.player3.setVolume(0.5);
				$scope.player3.setMuted(true);
				$scope.player3.setQuality('low');
			}

			$scope.ifmo = {
				mo0: false,
				mo1: false,
				mo2: false,
				mo3: false
				// chatmo: false
			}

			window.addEventListener('blur', function() {
				var p_channel = $scope.player0.getChannel();
				var channel = '';
				// var changed = true;

				// if ($scope.ifmo.chatmo) return; // dont give a shit if we click chat

				if ($scope.ifmo.mo0) {
					// do nothing
					return;
				} else if ($scope.ifmo.mo1) {
					channel = $scope.player1.getChannel();
					$scope.player0.setChannel(channel);
					$scope.player1.setChannel(p_channel);
				} else if ($scope.ifmo.mo2) {
					channel = $scope.player2.getChannel();
					$scope.player0.setChannel(channel);
					$scope.player2.setChannel(p_channel);
				} else if ($scope.ifmo.mo3) {
					channel = $scope.player3.getChannel();
					$scope.player0.setChannel(channel);
					$scope.player3.setChannel(p_channel);
				} else {
					return;
				}

				$('#chat').attr('src', 'http://www.twitch.tv/' + channel + '/chat');

			});

			document.getElementById('player0').addEventListener('mouseover', function() {
				$scope.ifmo.mo0 = true;
				window.focus();
			});
			document.getElementById('player0').addEventListener('mouseout', function() {
				$scope.ifmo.mo0 = false;
			});



			// document.getElementById('player1').addEventListener('mouseover', function() {
			// 	$scope.ifmo.mo1 = true;
			// 	window.focus();
			// });
			// document.getElementById('player1').addEventListener('mouseout', function() {
			// 	$scope.ifmo.mo1 = false;
			// });

			// document.getElementById('player2').addEventListener('mouseover', function() {
			// 	$scope.ifmo.mo2 = true;
			// 	window.focus();
			// });
			// document.getElementById('player2').addEventListener('mouseout', function() {
			// 	$scope.ifmo.mo2 = false;
			// });

			// document.getElementById('player3').addEventListener('mouseover', function() {
			// 	$scope.ifmo.mo3 = true;
			// 	window.focus();
			// });
			// document.getElementById('player3').addEventListener('mouseout', function() {
			// 	$scope.ifmo.mo3 = false;
			// });

			// document.getElementById('chat').addEventListener('mouseover', function() {
			// 	$scope.ifmo.mo3 = true;
			// 	window.focus();
			// });
			// document.getElementById('chat').addEventListener('mouseout', function() {
			// 	$scope.ifmo.mo3 = false;
			// });

			window.onresize = function() {
				var w = document.getElementById('player0').offsetWidth;
				player0.childNodes[0].width = w;
				player0.childNodes[0].height = w * 9 / 16;
				// w = document.getElementById('player1').offsetWidth;
				// player1.childNodes[0].width = w;
				// player1.childNodes[0].height = w * 9 / 16;
				// player2.childNodes[0].width = w;
				// player2.childNodes[0].height = w * 9 / 16;
				// player3.childNodes[0].width = w;
				// player3.childNodes[0].height = w * 9 / 16;
			}

			$('#streams').on('keydown', function(key) {
				if (key.keyCode == 13) { // pressed enter
					/** Sanitize input **/
					var ss = $('#streams').val();
					// Eat white space
					while (ss.includes(" ")) {
						ss = ss.replace(" ", "");
					}
					// max length twitch name == 25 char
					// expect input less than 110 chars (safe)
					if (ss.length > 110) {
						alert('It appears that you\'ve entered too many streams');
						return;
					}
					// watch out for them crazy chars
					if (ss.includes("<") || ss.includes(">") || ss.includes("!") || ss.includes("&")) {
						alert('That looks a little fishy...');
						return;
					}

					/** Use input **/
					// setup streams
					var parsed = false;
					var streams = [];
					var idx = 0;
					while (!parsed) {
						if (ss.includes(",")) {
							// more after this
							idx = ss.indexOf(",");
							streams.push(ss.substr(0, idx));
							ss = ss.substr(idx + 1, ss.length);
						} else {
							// last stream to parse
							streams.push(ss);
							parsed = true;
						}
					}

					// do me better
					switch (streams.length) {
						case 0:
							return;
						case 1:
							$scope.player0.setChannel(streams[0]);
							break;
						case 2:
							$scope.player0.setChannel(streams[0]);
							$scope.player1.setChannel(streams[1]);
							break;
						case 3:
							$scope.player0.setChannel(streams[0]);
							$scope.player1.setChannel(streams[1]);
							$scope.player2.setChannel(streams[2]);
							break;
						case 4:
							$scope.player0.setChannel(streams[0]);
							$scope.player1.setChannel(streams[1]);
							$scope.player2.setChannel(streams[2]);
							break;
						default:
							break;
					}

					$('#chat').attr('src', 'http://www.twitch.tv/' + streams[0] + '/chat');

				}
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