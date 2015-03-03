'use strict';

/**
 * @ngdoc overview
 * @name lostAndFoundApp
 * @description
 * # lostAndFoundApp
 *
 * Main module of the application.
 */
angular
	.module('lostAndFoundApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ui.bootstrap',
		'ui.bootstrap.showErrors'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			//.when('/about', {
			//  templateUrl: 'views/about.html',
			//  controller: 'AboutCtrl'
			//})
			.otherwise({
				redirectTo: '/'
			});
	});
