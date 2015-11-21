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
		'ui.router',
		'ngSanitize',
		'ngTouch',
		'ui.bootstrap',
		'ngMaterial',
		'toastr',
		'angular-loading-bar'
	])
	.config(function ($stateProvider, $urlRouterProvider) {
		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise('/');
	})
	.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
		cfpLoadingBarProvider.latencyThreshold = 0;
	}]);
