(
	function () {
	'use strict'

		

		angular.module('ShoppingListApp', [])
		.controller('ShoppingListAddController', ShoppingListAddController)
		.controller('ShoppingListShowController', ShoppingListShowController)		
		.service('ShoppingListService', ShoppingListService);


		ShoppingListAddController.$inject = ['ShoppingListService'];
		function ShoppingListAddController(ShoppingListService) {
			var itemAdder = this;

			itemAdder.name = "";
			itemAdder.quantity = "";

			itemAdder.addItem = function() {
				ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
			}

		}		

		ShoppingListShowController.$inject = ['ShoppingListService'];
		function ShoppingListShowController (ShoppingListService) {			
			var showList = this;

			showList.items = ShoppingListService.getItems();

			showList.removeItem = function (itemIndex) {
				ShoppingListService.removeItem(itemIndex);
			}

		}

		
		function ShoppingListService() {
			var service = this;

			//List of shopping items
			var items = [
				{
					name: 'Apples',
					quantity: 5
				},
				{
					name: 'Chips',
					quantity: 6
				},
				{
					name: 'Cookies',
					quantity: 2
				},
				{
					name: 'Tomatos',
					quantity: 2
				},
				{
					name: 'Cake',
					quantity: 1
				},
				{
					name: 'Blah',
					quantity: 9
				}
			];

			service.addItem = function (itemName, quantity) {
				var item = {
					name: itemName,
					quantity: quantity
				};

				items.push(item);
			};

			service.getItems = function () {
				return items;
			};

			service.removeItem = function(itemIndex) {
				
				items.splice(itemIndex, 1);
			};

		}

	}
)();