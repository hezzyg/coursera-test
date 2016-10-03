(
	function() {

		'use strict'

		angular.module('MenuCategoriesApp',[])
		.controller('MenuCategoriesController', MenuCategoriesController)
		.service('MenuCategoriesService', MenuCategoriesService)
		.constant('ApiBAseUrl', "http://davids-restaurant.herokuapp.com");

		MenuCategoriesController.$inject = ['MenuCategoriesService'];
		function MenuCategoriesController (MenuCategoriesService) {
			var menu = this;

			var promise = MenuCategoriesService.getMenuCategories();

			promise.then(function (response) {
				menu.categories = response.data;
			})
			.catch(function (error) {
				console.log("Something went terribly wrong!");
			});

			menu.logMenuItems = function (cat) {
				var promise = MenuCategoriesService.logMenuItems(cat);

				promise.then(function(response) {
					console.log(response.data);
				})
				.catch(function(error) {
					console.log(error);
				});
			};

		};


		MenuCategoriesService.$inject = ['$http', 'ApiBAseUrl'];
		function MenuCategoriesService ($http,ApiBAseUrl) {
			var service = this;

			service.getMenuCategories = function () {
				var response = $http({
					method: "GET",
					url: (ApiBAseUrl + "/categories.json")
				});

				return response;
			};

			service.logMenuItems = function (cat) {
				var response = $http ({
					method: "GET",
					url: (ApiBAseUrl + "/menu_items.json"),
					params: {
						category: cat
					}
				});
				
				return response;
			};
		};


})();