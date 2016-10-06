(
	function () {
	'use strict'

		

		angular.module('ShoppingList', [])
		.controller('ShoppingListController', ShoppingListController)			
		.factory('ShoppingListFactory', ShoppingListFactory)
		.service('WeightLossFilterService', WeightLossFilterService)
		.component('shoppingList', {
			templateUrl:  "shoppingListTemplateEvents.html",
			controller: ShoppingListComponentController,
			bindings: {
				items: '<',
				title: '@title',				
				onRemove: '&'
			}
		})
		.component('loadingSpinner', {
			templateUrl: 'spinner.html',
			controller: SpinnerController
		});



		SpinnerController.$inject = ['$rootScope'];
		function SpinnerController ($rootScope) {
			var $ctrl = this;

			$rootScope.$on('shoppinglist:processing', function (event, data) {
				console.log("event is: ", event);
				console.log("data is: ", data);

				if (data.on) { $ctrl.showSpinner = true}
					else ($ctrl.showSpinner = false)
			});

		};
		
		ShoppingListComponentController.$inject = ['$rootScope','$element', '$q', 'WeightLossFilterService'];
		function ShoppingListComponentController ($rootScope, $element, $q, WeightLossFilterService) {
			var $ctrl = this;
			var totalItems;

			$ctrl.coockiesInList = function() {
				for (var i = 0; i < $ctrl.items.length; i++) {
					var name = $ctrl.items[i].name;
					if (name.toLowerCase().indexOf("coockie") !== -1) {
						return true;
					}
				}

				return false;
			};

			$ctrl.$onInit = function() {
				totalItems = 0;
			};

			$ctrl.$onChanges = function (changeObj) {
				console.log("Changes: ", changeObj);
			};

			$ctrl.$doCheck = function () {
					
					if ($ctrl.items.length !== totalItems) {						
						totalItems = $ctrl.items.length;

						$rootScope.$broadcast('shoppinglist:processing', {on: true});
						var promises = [];
						for (var i=0; i < $ctrl.items.length; i++) {
							promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
						}

						$q.all(promises)
						.then(function (result) {
							//Remove coockie warning
							var warningElem = $element.find('div.error');
							warningElem.slideUp(900);
						})
						.catch(function (result) {
							//Show coockie warning
							var warningElem = $element.find('div.error');
							warningElem.slideDown(900);	
						})
						.finally(function () {
							$rootScope.$broadcast('shoppinglist:processing', {on: false});
						});
					}
			};

			$ctrl.remove = function (myIndex) {
				$ctrl.onRemove({itemIndex: myIndex});
			};
		}

		
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

		WeightLossFilterService.$inject = ['$q', '$timeout'];
		function WeightLossFilterService ($q, $timeout) {
			var service = this;

			service.checkName = function (name) {
				var deferred = $q.defer();

				var result = {
					message: ""
				};

				$timeout (function() {
					//Check for "Cookies"
					if (name.toLowerCase().indexOf("coockie") === -1) {
						deferred.resolve(result)
					}
					else {
						result.message = "Stay away from coockies, Hezzy!";
						deferred.reject(result);
					}
				},3000);

				return deferred.promise;
			};

			service.checkQuantity = function (quantity) {
				var deferred = $q.defer();

				var result = {
					message: ""
				};

				$timeout (function() {
					//Check for too many boxes
					if (quantity < 6) {
						deferred.resolve(result);
					}
					else {
						result.message = "That's too much!";
						deferred.reject(result);
					}
				}, 1000);

				return deferred.promise;
			};
		}

	}
)();