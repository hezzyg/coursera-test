(function() {
	'use strict'

	angular.module('MenuApp')
	.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['categories'];
	function CategoriesController (categories) {
		var catList = this;

		catList.categories = categories.data;
		console.log("categories in controller are: ", categories);
	}


})();