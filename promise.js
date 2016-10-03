(
	function () {
	'use strict'

		

		angular.module('ShoppingListApp', [])
		.controller('ShoppingListController', ShoppingListController)		
		.service('ShoppingListService', ShoppingListService)
		.service('WeightLossFilterService', WeightLossFilterService);


		//LIST controller
		ShoppingListController.$inject = ['ShoppingListService'];
		function ShoppingListController (ShoppingListService) {			
			var list = this;	

			list.items = ShoppingListService.getItems();

			list.itemName = "";
			list.itemQuantity = "";

			list.addItem = function () {
				try {
					ShoppingListService.addItem(list.itemName, list.itemQuantity);
					list.itemName = "";
					list.itemQuantity = "";
				} catch (error) {
					list.errorMessage = error.message;
				}
			}

			list.removeItem = function (itemIndex) {
				ShoppingListService.removeItem(itemIndex);
			}		

		}
		
		
		ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
		function ShoppingListService($q, WeightLossFilterService) {
			var service = this;

			var items= [];		

			/*service.addItem = function (itemName, quantity) {
				var promise = WeightLossFilterService.checkName(itemName);

				promise.then(function (response) {
					var nextPromise = WeightLossFilterService.checkQuantity(quantity);

					nextPromise.then(function (result) {
						var item = {
							name: itemName,
							quantity: quantity
						};
						items.push(item);
					}, function (errorResponse) { //NextPromise Error
						console.log(errorResponse.message);
					});
				}, function (errorResponse) { //FIrst Promise Error
					console.log(errorResponse.message);
				});
			};*/

			/*service.addItem = function (itemName, quantity) {
				var promise = WeightLossFilterService.checkName(itemName);

				promise
				.then(function (response) {
					return WeightLossFilterService.checkQuantity(quantity);
				})
				.then(function (response) {
					var item = {
						name: itemName,
						quantity: quantity
					};
					items.push(item);
				})
				.catch(function (errorResponse) {
					console.log(errorResponse.message);
				});
			};*/

			service.addItem = function (itemName, quantity) {
				var namePromise = WeightLossFilterService.checkName(itemName);
				var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

				$q.all([namePromise, quantityPromise]).
				then(function (response) {
					var item = {
						name: itemName,
						quantity: quantity
					};
					items.push(item);
				})
				.catch(function (errorResponse) {
					console.log(errorResponse.message);
				});
			};


			service.getItems = function () {
				return items;
			};

			service.removeItem = function(itemIndex) {
				
				items.splice(itemIndex, 1);
			};

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

})();