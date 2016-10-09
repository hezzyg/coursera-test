(function() {
	'use strict'

	angular.module('MenuApp')
	.controller('ItemsController', ItemsController);

	ItemsController.$inject = ['items'];
	function ItemsController (items) {
		var itemsList = this;

		itemsList.items = items.data.menu_items;
		items.catTitle = items.data.category.name;
		
		console.log("ItemsController in controller are: ", items.data);
		console.log("title is: ", items.catTitle);
	}


})();