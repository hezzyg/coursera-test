(
	function () {
	'use strict'

		

		angular.module('ShoppingListDirectiveApp', [])
		.controller('ShoppingListController', ShoppingListController)	
		.controller('ShoppingListDirectiveController', ShoppingListDirectiveController)	
		.factory('ShoppingListFactory', ShoppingListFactory)
		.directive('shoppingList', ShoppingListDirective);

		function ShoppingListDirective () {
			var ddo = {
				templateUrl:  "shoppingListTemplateIsolateScopeAnd.html",
				scope: {
					items: '<',
					title: '@',
					badRemove: '=',
					onRemove: '&'
				},
				controller: 'ShoppingListDirectiveController as list',
				// controllerAs: 'list',
				bindToController: true
			};

			return ddo;
		}

		function ShoppingListDirectiveController () {
			var list = this;

			list.coockiesInList = function() {
				for (var i = 0; i < list.items.length; i++) {
					var name = list.items[i].name;
					if (name.toLowerCase().indexOf("coockie") !== -1) {
						return true;
					}
				}

				return false;
			}
		}

		//LIST #1 controller
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