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
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ui.bootstrap.showErrors',
        'ngMaterial',
        'toastr',
        'angular-loading-bar',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");

        // Now set up the states
        $stateProvider
            .state('documentForm', {
                url: "/",
                templateUrl: "templates/documentForm.html",
                controller: 'MainCtrl'
            })
            .state('deviceForm', {
                templateUrl: "templates/deviceForm.html",
                controller: 'MainCtrl'
            })
            .state('licenseForm', {
                templateUrl: "templates/licenseForm.html",
                controller: 'MainCtrl'
            });
    })
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.latencyThreshold = 0;
    }]);
