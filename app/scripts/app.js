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
		$routeProvider.
			when('/documentForm', {
				templateUrl: 'templates/documentForm.html',
				controller: 'MainCtrl'
			}).
			when('/deviceForm', {
				templateUrl: 'templates/deviceForm.html',
				controller: 'MainCtrl'
			}).
			when('/licenseForm', {
				templateUrl: 'templates/licenseForm.html',
				controller: 'MainCtrl'
			}).
			otherwise({
				redirectTo: '/documentForm'
			});
	})
	.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
		cfpLoadingBarProvider.latencyThreshold = 0;
	}]);
