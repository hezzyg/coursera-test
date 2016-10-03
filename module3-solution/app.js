(function() {
	'use strict'

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective);
	

	function FoundItemsDirective () {
		var ddo = {
			restrict: "E",
			templateUrl: 'foundItemsDirective.html',
			scope: {
				items: '<',
				onRemove: '&'

			},
			controller: NarrowItDownController,
			controllerAs: 'ctrl',
			bindToController: true
		};

		return ddo;

	}


	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {
		var list = this;		
		list.searchBox = "";
		list.nothingIsFound = false;

		//found = call getmatchedMenuItems
		list.matchedMenuItems = function (searchBox) {
			console.log("button is clicked! with searchBox is: ", searchBox);
			var promise = MenuSearchService.getMatchedMenuItems(searchBox);

			console.log("promise is: ", promise);
			promise
			.then (function(response) {
				list.found = response;	
				if (!response.length) {
					list.nothingIsFound = true;
				}
			});


		};

		list.removeItem = function (index) {
			list.found.splice(index, 1);
		};
	}


	MenuSearchService.$inject = ['$http'];
	function MenuSearchService ($http) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {			
			
			return $http({
				method: "GET",
				url: 'http://davids-restaurant.herokuapp.com/menu_items.json'
				})

				.then(function (result) {
	   				 // process result and only keep items that match
	   				var fullMenu = result.data;	   				
	    			var foundItems = [];
	    			

	    			if (searchTerm) {
		    			for (var i=0; i < fullMenu.menu_items.length; i++) {						
							if (fullMenu.menu_items[i].description.toLowerCase().
								indexOf(searchTerm.toLowerCase()) != -1) {
									foundItems.push(fullMenu.menu_items[i]);											
							}
						}
					}
	    			
	    			return foundItems;
				});

		};
		
	}

})();

