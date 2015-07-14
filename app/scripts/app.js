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
		'ngAria',
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ui.bootstrap',
		'ui.bootstrap.showErrors',
		'ngMaterial',
		'toastr',
		'angular-loading-bar'
	])
	.config(function ($routeProvider) {
		$routeProvider
			// .when('/', {
			// 	templateUrl: 'views/main.html',
			// 	controller: 'MainCtrl'
			// })
			// .when('/about', {
			//  templateUrl: 'views/about.html',
			//  controller: 'AboutCtrl'
			// })
			.otherwise({
				redirectTo: '/'
			});
	})
	.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
		cfpLoadingBarProvider.latencyThreshold = 0;
	}]);
