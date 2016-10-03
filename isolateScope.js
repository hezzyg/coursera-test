(
	function () {
	'use strict'

		

		angular.module('ShoppingListDirectiveApp', [])
		.controller('ShoppingListController1', ShoppingListController1)
		.controller('ShoppingListController2', ShoppingListController2)		
		.factory('ShoppingListFactory', ShoppingListFactory)
		.directive('shoppingList', ShoppingList);

		function ShoppingList () {
			var ddo = {
				templateUrl:  "shoppingListTemplate.html",
				scope: {
					list: '=myList',
					title: '@title'
				}
			};

			return ddo;
		}

		//LIST #1 controller
		ShoppingListController1.$inject = ['ShoppingListFactory'];
		function ShoppingListController1 (ShoppingListFactory) {			
			var list1 = this;

			//Use factory to create new shopping list service
			var shoppingList = ShoppingListFactory();

			list1.items = shoppingList.getItems();
			var origTitle = "Shopping List #1";
			list1.title = origTitle + " (" + list1.items.length + " items)";

			list1.itemName = "";
			list1.itemQuantity = "";

			list1.addItem = function () {
				try {
					shoppingList.addItem(list1.itemName, list1.itemQuantity);
					list1.itemName = "";
					list1.itemQuantity = "";
					list1.title = origTitle + " (" + list1.items.length + " items)";
				} catch (error) {
					list1.errorMessage = error.message;
				}

			}

			list1.removeItem = function (itemIndex) {
				shoppingList.removeItem(itemIndex);
				list1.title = origTitle + " (" + list1.items.length + " items)";
			}

			

		}

		ShoppingListController2.$inject = ['ShoppingListFactory'];
		function ShoppingListController2 (ShoppingListFactory) {			
			var list2 = this;

			//Use factory to create new shopping list service
			var shoppingList = ShoppingListFactory(3);
			
			list2.items = shoppingList.getItems();
			var origTitle = "Shopping Lsit #2";
			list2.title = origTitle + " (" + list2.items.length + " items)";

			list2.itemName = "";
			list2.itemQuantity = "";

			list2.addItem = function () {
				try {
					shoppingList.addItem(list2.itemName, list2.itemQuantity);
					list2.itemName = "";
					list2.itemQuantity = "";
					list2.title = origTitle + " (" + list2.items.length + " items)";
				} catch (error) {
					list2.errorMessage = error.message;					
				}
			}

			list2.removeItem = function (itemIndex) {
				shoppingList.removeItem(itemIndex);
				list2.title = origTitle + " (" + list2.items.length + " items)";
			}


		}

		
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


		function ShoppingListFactory() {
			var factory = function(maxItems) {
				return new ShoppingListService(maxItems);
			};

			return factory;
		}

	}
)();