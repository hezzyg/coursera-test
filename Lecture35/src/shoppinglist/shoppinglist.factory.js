(function() {
'use strict'

angular.module('ShoppingList')
.factory('ShoppingListFactory', ShoppingListFactory);


function ShoppingListFactory() {
	var factory = function(maxItems) {
		return new ShoppingListService(maxItems);
	};

	return factory;
}

// if not specified, maxItems is unlimited
function ShoppingListService(maxItems) {
	var service = this;	

	var items= [];		

	service.addItem = function (itemName, quantity) {
		if (maxItems === undefined ||
			(maxItems != undefined && items.length < maxItems)) {
				var item = {
					name: itemName,
					quantity: quantity
				};						
				items.push(item);						
		} else {
			throw new Error("Max Items (" + maxItems + ") reached");
		}

	};

	service.getItems = function () {
		return items;
	};

	service.removeItem = function(itemIndex) {
		
		items.splice(itemIndex, 1);
	};

}

})();