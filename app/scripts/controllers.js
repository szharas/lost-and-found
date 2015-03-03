'use strict';

angular.module('lostAndFoundApp')
	.controller('MainCtrl', function ($scope) {
		// Initialize variables
		$scope.lostAndFound = {};
		$scope.lostAndFound.lostCategory = 'Документ';
		$scope.lostAndFound.lostSubCategory = 'Удостоверение личности';
		$scope.formType = 'lost';
		$scope.formTypeRu = 'утери';
		$scope.isFormOpen = false;


		$scope.saveForm = function (lostAndFound) {
			console.log('Saving object: ' + JSON.stringify(lostAndFound));
		};

		$scope.setFormTypeAndToggleOpen = function (formType, formTypeRu) {
			if (!$scope.isFormOpen) {
				$scope.isFormOpen = true;
			} else {
				if ($scope.formType === formType) {
					$scope.isFormOpen = false;
				}
			}

			$scope.formType = formType;
			$scope.formTypeRu = formTypeRu;

			// Reset form validation
			$scope.$broadcast('show-errors-reset');
		};

		$scope.isLostForm = function () {
			return ($scope.formType === 'lost');
		};

		$scope.isFoundForm = function () {
			return ($scope.formType === 'found');
		};
	});
