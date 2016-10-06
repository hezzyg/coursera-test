(function() {
'use strict'

angular.module('ShoppingList')
.controller('ShoppingListController', ShoppingListController);


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController (ShoppingListFactory) {			
	var list = this;

	//Use factory to create new shopping list service
	var shoppingList = ShoppingListFactory();

	list.items = shoppingList.getItems();
	var origTitle = "Shopping List #1";
	list.title = origTitle + " (" + list.items.length + " items)";

	list.itemName = "";
	list.itemQuantity = "";

	list.addItem = function () {
		try {
			shoppingList.addItem(list.itemName, list.itemQuantity);
			list.itemName = "";
			list.itemQuantity = "";
			list.title = origTitle + " (" + list.items.length + " items)";
		} catch (error) {
			list.errorMessage = error.message;
		}

	}

	list.removeItem = function (itemIndex) {
		console.log("This is: " , this);
		this.lastRemoved = "Last remove was " + this.items[itemIndex].name;
		shoppingList.removeItem(itemIndex);
		this.title = origTitle + " (" + list.items.length + " items)";
	}			

}

})();
