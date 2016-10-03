(
	function () {
	'use strict'

		

		angular.module('ShoppingListDirectiveApp', [])
		.controller('ShoppingListController', ShoppingListController)			
		.factory('ShoppingListFactory', ShoppingListFactory)
		.directive('shoppingList', ShoppingListDirective);

		function ShoppingListDirective () {
			var ddo = {
				templateUrl:  "shoppingListTemplateLinkFunction.html",
				scope: {
					items: '<',
					myTitle: '@title',
					badRemove: '=',
					onRemove: '&'
				},
				controller: ShoppingListDirectiveController,
				controllerAs: 'list',
				bindToController: true,
				link: ShoppingListDirectiveLink
			};

			return ddo;
		}


		function ShoppingListDirectiveLink (scope, element, attrs, controller) {
			console.log("link scope is: ", scope);
			console.log("Controller instance is: ", controller);
			console.log('Element is: ', element);

			scope.$watch("list.coockiesInList()", function(newValue, oldValue) {
				console.log("Old value: ", oldValue);
				console.log("New value: ", newValue);

				if (newValue === true) {
					displayCoockieWarning();
				}
				else {
					removeCoockieWarning();
				}
			});

			function displayCoockieWarning() {
				//using Angularjs jqilte
				/*var warningElem = element.find("div");
				warningElem.css("display", "block");
				console.log(warningElem);*/

				//with JQUERY
				var warningElem = element.find("div.error");
				warningElem.slideDown(900);
			}


			function removeCoockieWarning() {
				/*var warningElem = element.find("div");
				warningElem.css("display", "none");*/

				//with JQUERY
				var warningElem = element.find("div.error");
				warningElem.slideUp(900);
				
			}

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