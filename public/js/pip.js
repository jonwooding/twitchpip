angular.module('pipApp', ['ngMaterial', 'ngMessages'])

	// .config(function($routeProvider, $locationProvider) {
	// 	$routeProvider
	// 		.when('/', {
	// 			controller: 'HomeController',
	// 			templateUrl: '../partials/home-partial.html'
	// 		})

	// 		.when('/about', {
	// 			controller: 'AboutController',
	// 			templateUrl: '../partials/about-partial.html'
	// 		})

	// 		.when('/donate', {
	// 			controller: 'DonateController',
	// 			templateUrl: '../partials/donate-partial.html'
	// 		})

	// 		.when('/contact', {
	// 			controller: 'ContactController',
	// 			templateUrl: '../partials/contact-partial.html'
	// 		})

	// 	$locationProvider.html5Mode({
	// 		enabled: true,
	// 		requireBase: false
	// 	});
	// })

	// .controller('GlobalController', ['$scope', '$http',
	// 	function($scope, $http) {

	// 	}
	// ])

	.controller('HomeController', ['$scope', '$http', '$timeout',
		function($scope, $http, $timeout) {

			$scope.players = [];
			$scope.previews = [];
			// **TEMP
			// TEMP**

			$scope.mo = false;
			$scope.mo0 = false;
			$scope.mo1 = false;
			$scope.mo2 = false;
			$scope.mo3 = false;
			$scope.mo4 = false;


			$scope.$watch('page_state', function(n, o) {
				if (n > 0 && o == 0) {
					// Moving out of watch, mute streams
					$scope.mainMuted = $scope.players[0].getMuted();
					$scope.players[0].setMuted(true);
				} else if (n == 0 && o != 0) {
					// Moving into watch, unmute streams
					if ($scope.mainMuted == false) {
						$scope.players[0].setMuted(false);
					}
				}
			});

			// Set up iframes, defer resize on page load
			// Arbitrary default options
			var options = {
				width: 100,
				height: 100,
				channel: ''
			};
			$scope.players.push(new Twitch.Player("player0", options));
			$scope.players.push(new Twitch.Player("player1", options));
			$scope.players.push(new Twitch.Player("player2", options));
			$scope.players.push(new Twitch.Player("player3", options));

			$scope.players[0].setVolume(0.5);
			$scope.players[0].setMuted(true);
			// $scope.players[0].setMuted(false);
			$scope.players[0].setQuality('chunked');

			$scope.players[1].setVolume(0.5);
			$scope.players[1].setMuted(true);
			$scope.players[1].setQuality('low');

			$scope.players[2].setVolume(0.5);
			$scope.players[2].setMuted(true);
			$scope.players[2].setQuality('low');

			$scope.players[3].setVolume(0.5);
			$scope.players[3].setMuted(true);
			$scope.players[3].setQuality('low');

			// Page is loaded, resize frames
			// angular.element(document).ready(function($scope) {
			$scope.$watch('$viewContentLoaded', function() {

				$timeout(function() {
					var w = document.getElementById('player0').offsetWidth;
					$scope.players[0]._bridge._iframe.width = w;
					$scope.players[0]._bridge._iframe.height = w * 9 / 16;

					w = document.getElementById('rs_tabs').offsetWidth;
					var h = w * 9 / 16;
					for (var i = 1; i < 4; i++) {
						$scope.players[i]._bridge._iframe.width = w;
						$scope.players[i]._bridge._iframe.height = h;
					}
					document.getElementById('chat').width = w;
					document.getElementById('chat').height = w * 27 / 16;
				});

			});

			$scope.ifmo = {
				mo0: false,
				mo1: false,
				mo2: false,
				mo3: false,
				chatmo: false
			}

			window.addEventListener('blur', function() {
				var p_channel = $scope.players[0].getChannel();
				var p_title = $scope.players[0].title;
				var channel = '';
				var title = '';

				if ($scope.ifmo.chatmo) return;

				if ($scope.ifmo.mo0) {
					return;
				} else if ($scope.ifmo.mo1) {
					channel = $scope.players[1].getChannel();
					$scope.players[0].setChannel(channel);
					$scope.players[0].title = $scope.players[1].title;
					$scope.players[1].setChannel(p_channel);
					$scope.players[1].title = p_title;
				} else if ($scope.ifmo.mo2) {
					channel = $scope.players[2].getChannel();
					$scope.players[0].setChannel(channel);
					$scope.players[0].title = $scope.players[2].title;
					$scope.players[2].setChannel(p_channel);
					$scope.players[2].title = p_title;
				} else if ($scope.ifmo.mo3) {
					channel = $scope.players[3].getChannel();
					$scope.players[0].setChannel(channel);
					$scope.players[0].title = $scope.players[3].title;
					$scope.players[3].setChannel(p_channel);
					$scope.players[3].title = p_title;
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

			document.getElementById('chat').addEventListener('mouseover', function() {
				$scope.ifmo.mo3 = true;
				window.focus();
			});
			document.getElementById('chat').addEventListener('mouseout', function() {
				$scope.ifmo.mo3 = false;
			});

			window.onresize = function() {
				var w = document.getElementById('player0').offsetWidth;
				$scope.players[0]._bridge._iframe.width = w;
				$scope.players[0]._bridge._iframe.height = w * 9 / 16;
				w = document.getElementById('rs_tabs').offsetWidth;
				var h = w * 9 / 16;
				for (var i = 1; i < 4; i++) {
					$scope.players[i]._bridge._iframe.width = w;
					$scope.players[i]._bridge._iframe.height = h;
				}
				document.getElementById('chat').width = w;
				document.getElementById('chat').height = w * 27 / 16;
			}

			$('#streams').on('keydown', function(key) {
				var ss = $('#streams').val();

				// TODO: this doesn't work -- it should clear preview panel on empty input
				if (ss == "") {
					$scope.previews = [];
					return;
				}

				/** Sanitize input **/
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

				var idx = 0;

				if (key.keyCode == 13) { // pressed enter
					// Clear search bar
					$('#streams').val("");
					$('#streams').blur();
					// Drop preview container
					$scope.previews = [];

					/** Use input **/
					// setup streams
					var parsed = false;
					var streams = [];
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

					for (var i = 0; i < streams.length; i++) {
						$scope.players[i].setChannel(streams[i]);
						requestTitle(streams[i], i);
					}

					for (var i = streams.length; i < 4; i++) {
						$scope.players[i].setChannel('');
						$scope.players[i].title = '';
						$scope.players[i].channel = '';
					}

					$('#chat').attr('src', 'http://www.twitch.tv/' + streams[0] + '/chat');

				} else {
					// handle up to commas
					while (ss.indexOf(',') > 0) {
						ss = ss.substr(ss.indexOf(',') + 1, ss.length);
					}
					$http({
						method: 'GET',
						url: 'https://api.twitch.tv/kraken/search/streams?query=' + ss,
						headers: {
							'Client-ID': 'vdxavurxxnt7a6hfuz87xp1n7dim3d'
						}
					}).then(function successResponse(response) {
						var len = Math.min(response.data.streams.length, 5);
						for (var i = 0; i < len; i++) {
							// TODO: pull only what we need (?)
							$scope.previews[i] = response.data.streams[i]
						}

						$scope.$apply();

					}, function errorResponse(response) {
						console.log('we fucked up somewhere ++ ' + response);
					});
				}
			});

			function requestTitle(stream, idx) {

				// TODO: get client id from oauth token twitch
				$http({
					method: 'GET',
					url: 'https://api.twitch.tv/kraken/channels/' + stream,
					headers: {
						'Client-ID': 'vdxavurxxnt7a6hfuz87xp1n7dim3d'
					},
					data: {
						'idx': idx
					}
				}).then(function successCallback(response) {
					$scope.players[idx].title = response.data.status;
					$scope.players[idx].channel = stream;
				}, function errorCallback(response) {
					console.log('There was an error retrieving ' + stream + ' stream title.')
				});

			}

			$scope.previewClickEvent = function(preview) {
				var ss = $('#streams').val();
				var selected = preview.channel.display_name;
				var streams = [];

				while (ss.includes(" ")) {
					ss = ss.replace(" ", "");
				}

				var parsed = false;
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

				while (streams.length > 4) {
					streams.pop();
				}
				streams.pop();
				streams.push(selected);
				ss = '';
				for (var i = 0; i < streams.length; i++) {
					ss += streams[i] + ', ';
				}
				if (streams.length == 4) {
					ss = ss.substr(0, ss.length - 2);
				}

				$("#streams").val(ss)

				$scope.previews = [];
				$('#streams').focus();
			}

			$scope.moEvent = function(idx) {
				console.log("got click mo for idx: " + idx);
				switch (idx) {
					case 0:
						$scope.mo0 = true;
						break;
					default:
						break;
				}
			}

		} // End of controller
	])