'use strict';

angular.module('lostAndFoundApp')
	.service('MainService', function ($http) {
		this.getCities = function () {
			var cities = [
				'Астана', 'Алматы', 'Актау', 'Актобе', 'Атырау', 'Джезказган', 'Караганда',
				'Костанай', 'Кокшетау', 'Кызылорда', 'Павлодар', 'Петропавловск', 'Семипалатинск',
				'Талдыкорган', 'Тараз', 'Туркестан', 'Уральск', 'Усть-Каменогорск', 'Шымкент', 'Экибастуз'
			];

			return cities;
		};
		this.getLostCategories = function () {
			var lostCategories = [
				'Документ',
				'Телефон/Планшет',
				'Гос. номер',
				'Другое'
			];

			return lostCategories;
		};
		this.getDocumentSubCategories = function () {
			var documentSubCategories = ['Удостоверение личности',
				'Паспорт',
				'Водительское удостоверение',
				'Тех. паспорт (Свидетельство о регистрации транспортного средства)',
				'Свидетельство о рождении',
				'Диплом',
				'Военный билет',
				'Другой документ'
			];

			return documentSubCategories;
		};
		this.getDeviceBrands = function () {
			var deviceBrands = $http.get('data/deviceBrands.json').success(function (response) {
				console.log('/data/deviceBrands.json: ' + JSON.stringify(response));
				return response.data;
			});

			return deviceBrands;
		};
	})
	.service('FormService', function () {
		this.getDocumentNumberLabel = function (documentSubCategory) {
			var result = 'ИИН';

			if (!documentSubCategory || documentSubCategory !== 'Удостоверение личности') {
				result = 'Номер документа';
			} else if (documentSubCategory === 'Удостоверение личности') {
				result = 'ИИН';
			}

			return result;
		};
	});
