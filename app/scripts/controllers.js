'use strict';

angular.module('lostAndFoundApp')
	.controller('MainCtrl', function ($scope, toastr) {
		// Initialize variables
		$scope.cities = ['Астана', 'Алматы'];
		$scope.lostCategories = ['Документ', 'Портмоне/Сумка', 'Телефон/Планшет', 'Гос. номер', 'Печати/Штампы', 'Другое'];
		$scope.lostSubCategories = ['Удостоверение личности', 'Паспорт', 'Свидетельство о рождении', 'Водительское удостоверение', 'Свидетельство о регистрации транспортного средства'];
		$scope.lostAndFound = {};
		$scope.lostAndFound.city = 'Астана';
		$scope.lostAndFound.lostCategory = 'Документ';
		$scope.lostAndFound.lostSubCategory = 'Удостоверение личности';
		$scope.formType = 'lost';
		$scope.formTypeRu = 'утери';
		$scope.isFormOpen = false;
		$scope.accordionBorderStyle = 'none';

		$scope.selectCity = function (city) {
			console.log('City selected:' + city);
			$scope.lostAndFound.city = city;
		};

		$scope.selectLostCategory = function (category) {
			console.log('Category selected: ' + category);
			$scope.lostAndFound.lostCategory = category;
		};

		$scope.selectLostSubCategory = function (subCategory) {
			console.log('Sub category selected: ' + subCategory);
			$scope.lostAndFound.lostSubCategory = subCategory;
		};

		$scope.setFormTypeAndToggleOpen = function (formType, formTypeRu) {
			console.log('setFormTypeAndToggleOpen called!');
			if (!$scope.isFormOpen) {
				$scope.isFormOpen = true;
				$scope.accordionBorderStyle = '1px solid;';
			} else {
				if ($scope.formType === formType) {
					$scope.isFormOpen = false;
					$scope.accordionBorderStyle = 'none';
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

		$scope.saveForm = function (lostAndFound) {
			console.log('Saving object: ' + JSON.stringify(lostAndFound));

			toastr.success('Заявка сохранена!');
		};
	});
