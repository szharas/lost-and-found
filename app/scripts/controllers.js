'use strict';

angular.module('lostAndFoundApp')
	.controller('MainCtrl', function ($scope, $http, toastr, $mdDialog) {
		// Declare variables
		$scope.cities = [
			'Астана', 'Алматы', 'Актау', 'Актобе', 'Атырау', 'Джезказган', 'Караганда',
			'Костанай', 'Кокшетау', 'Кызылорда', 'Павлодар', 'Петропавловск', 'Семипалатинск',
			'Талдыкорган', 'Тараз', 'Туркестан', 'Уральск', 'Усть-Каменогорск', 'Шымкент', 'Экибастуз'
		];
		$scope.lostCategories = [
			'Документ',
			'Телефон/Планшет',
			'Гос. номер',
			'Другое'
		];
		$scope.documentSubCategories = ['Удостоверение личности',
					'Паспорт',
					'Водительское удостоверение',
					'Тех. паспорт (Свидетельство о регистрации транспортного средства)',
					'Свидетельство о рождении',
					'Диплом',
					'Военный билет',
					'Другой документ'
		];

		$scope.deviceBrands = $http.get('data/deviceBrands.json').success(function(response) {
			console.log('/data/deviceBrands.json: ' + JSON.stringify(response.data));

			return response.data;
		});

		// Initialize variables
		$scope.lostAndFound = {};
		$scope.city = 'Астана';
		$scope.lostAndFound.formType = 'lost';
		$scope.lostAndFound.city ='Астана';
		$scope.formTypeRu = 'утери';
		$scope.isFormOpen = true;
		$scope.accordionBorderStyle = 'none';
		$scope.isFormSumbitted = false;

		// Functions
		$scope.selectCity = function (city) {
			console.log('City selected:' + city);
			$scope.city = city;
			$scope.lostAndFound.city = city;
		};

		$scope.selectLostCategory = function (category) {
			console.log('Category selected: ' + category);
			$scope.lostAndFound.lostCategory = category;
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

		$scope.saveForm = function (lostAndFound, lostAndFoundForm, event) {
			console.log('Saving object: ' + JSON.stringify(lostAndFound));
			$scope.isFormSumbitted = true;
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.body))
					.title('Заявка сохранена!')
					.content('Спасибо Вам за заявку. Пожалуйста сохраните BN20150719')
					.ariaLabel('Alert Dialog Demo')
					.ok('OK')
					.targetEvent(event)
			);

			if (!lostAndFoundForm.$valid) {
				toastr.error('Ошибка  в заявке!');
			} else {
				$http.post('/buronahodok/lostandfounds/save', lostAndFound).
					success(function (data, status, headers, config) {

						console.log('Server response success: ' + JSON.stringify(data));


						toastr.success('Заявка сохранена!');
					}).
					error(function (data, status, headers, config) {
						console.log('Server response error: ' + JSON.stringify(data));
						toastr.error('Ошибка при сохранении!');
					});
			}
		};
	});
