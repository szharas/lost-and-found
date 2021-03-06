'use strict';

angular.module('lostAndFoundApp')
	.controller('MainCtrl', function ($scope, MainService, FormService, $state, $http, toastr, $mdDialog) {
		// Declare variables
		$scope.cities = MainService.getCities();
		$scope.lostCategories = MainService.getLostCategories();
		$scope.documentSubCategories = MainService.getDocumentSubCategories();
		$scope.deviceBrands = MainService.getDeviceBrands();

		// Initialize variables
		$scope.forms = {};
		$scope.lostAndFound = {};
		$scope.lostAndFound.city = 'Астана';
		$scope.lostAndFound.formType = 'lost';
		$scope.formTypeRu = 'утери';
		$scope.lostAndFound.isWalletBagSelected = false;
		$scope.isFormOpen = true;
		$scope.accordionBorderStyle = 'none';
		$scope.isFormSumbitted = false;


		var self = this;
		// list of `state` value/display objects
		self.states        = $scope.deviceBrands;
		self.selectedItem  = null;
		self.searchText    = null;
		// ******************************
		// Internal methods
		// ******************************
		/**
		 * Search for states... use $timeout to simulate
		 * remote dataservice call.
		 */
		$scope.querySearch = function (query) {
			console.log('search query is called');
			var results = self.states.then(function(response) {
				console.dir(response.data);
				var results = query ? response.data.filter( createFilterFor(query) ) : [];
				return results;
			});

			return results;
		};
		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(state) {
				return (state.value.indexOf(lowercaseQuery) === 0);
			};
		};







		// Functions
		$scope.selectCity = function (city) {
			console.log('City selected:' + city);
			$scope.lostAndFound.city = city;
		};

		$scope.selectLostCategory = function (category) {
			console.log('Category selected: ' + category);

			$scope.lostAndFound.lostCategory = category;
			// Reset form validation
			console.dir($scope.forms.lostAndFoundForm);
			/*if ($scope.lostAndFound.lostCategory === 'Документ') {
				$state.go('documentForm');
			} else if ($scope.lostAndFound.lostCategory === 'Телефон/Планшет') {
				$state.go('deviceForm');
			} else if ($scope.lostAndFound.lostCategory === 'Гос. номер') {
				$state.go('licenseForm');
			}*/
		};

		$scope.selectDocumentSubCategory = function (documentSubCategory) {
			console.log('Sub category selected: ' + documentSubCategory);
			$scope.lostAndFound.documentSubCategory = documentSubCategory;
		};

		$scope.setFormTypeAndToggleOpen = function (formType, formTypeRu) {
			console.log('setFormTypeAndToggleOpen called!');
			if (!$scope.isFormOpen) {
				$scope.isFormOpen = true;
				$scope.accordionBorderStyle = '1px solid;';
			} else {
				if ($scope.lostAndFound.formType === formType) {
					$scope.isFormOpen = false;
					$scope.accordionBorderStyle = 'none';
				}
			}

			$scope.lostAndFound.formType = formType;
			$scope.formTypeRu = formTypeRu;

			// Reset form validation
			$scope.$broadcast('show-errors-reset');
		};

		$scope.isLostForm = function () {
			return ($scope.lostAndFound.formType === 'lost');
		};

		$scope.isFoundForm = function () {
			return ($scope.lostAndFound.formType === 'found');
		};

		$scope.getDocumentNumberLabel = function () {
			var result = FormService.getDocumentNumberLabel($scope.lostAndFound.documentSubCategory);

			return result;
		};

		$scope.saveForm = function (lostAndFound, event) {
			console.log('Saving object: ' + JSON.stringify(lostAndFound));
			console.log('$valid: ' + $scope.forms.lostAndFoundForm.$valid);
			$scope.isFormSubmitted = true;

			/*
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.body))
					.title('Заявка сохранена!')
					.content('Спасибо Вам за заявку. Пожалуйста сохраните BN20150719')
					.ariaLabel('Alert Dialog Demo')
					.ok('OK')
					.targetEvent(event)
			);*/

			if (!$scope.forms.lostAndFoundForm.$valid) {
				toastr.error('Ошибка  в заявке!');
			} else {
				$http.post('/buronahodok/lostandfounds/save', lostAndFound).
					success(function (data) {
						console.log('Server response success: ' + JSON.stringify(data));

						toastr.success('Заявка сохранена!');
					}).
					error(function (data) {
						console.log('Server response error: ' + JSON.stringify(data));
						toastr.error('Ошибка при сохранении!');
					});
			}
		};
	});
