
(

function () {
	'use strict'

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyShoppingController', ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyShoppingController (ShoppingListCheckOffService) {
		
		var list1 = this;
		var service = ShoppingListCheckOffService;
		
		list1.items = service.toBuyItems;

		list1.BoughtItem = function (itemIndex) {
			service.BoughtItem(itemIndex);
		}
	}


	AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtShoppingController (ShoppingListCheckOffService) {
		var list2 = this;
		var service = ShoppingListCheckOffService;
		list2.items = service.alreadyBoughtItems;

	}


	function ShoppingListCheckOffService () {

		var service = this;

		service.toBuyItems = [
			{
				name: "Coockies",
				quantity: 10
			},
			{
				name: "Apples",
				quantity: "5 kg"
			},
			{
				name: "Bananas",
				quantity: "2 kg"
			},
			{
				name: "Chips",
				quantity: "2 bags"
			},
			{
				name: "Cheese",
				quantity: "200 gr"
			},
			{
				name: "Olives",
				quantity: "250 gr"
			}
		];

		service.alreadyBoughtItems = [];

		service.BoughtItem = function (itemIndex) {
			var item = service.toBuyItems[itemIndex];
			service.toBuyItems.splice(itemIndex, 1);
			service.alreadyBoughtItems.push(item);
		}
	}
}
)();