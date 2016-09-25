
(
	function () {
		
		var shoppingList = [
		  "Milk", "Coockies", "Choclate", "PB", "Pepto Bismol", "Apple", "Grapes Apple", "Oranges"
		  ];

		var numberArray = [1,2,3,4,5,6,7,8,9,10];
		console.log("numberArray: " , numberArray);

		angular.module('filterApp', [])
		.controller('ShoppingListController', ShoppingListCtrl);

		ShoppingListCtrl.$inject = ['$scope'];
		function ShoppingListCtrl($scope) {

			 $scope.shoppingList = shoppingList;

			 console.log ("Shopping list is: ", shoppingList);

			function above5Filter (value) {
				return value > 5;	
			};

			var filterNuberArray = numberArray.filter(above5Filter);

			console.log ("new array is: " + filterNuberArray);


			var searchValue = "Apple";
			function containsFilter(value) {
				return value.indexOf(searchValue) !== -1;
			};

			var searchedShoppingList = shoppingList.filter (containsFilter);
			console.log("Searched Shopping List: ", searchedShoppingList);			
		};
	}
)();