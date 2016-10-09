(function() {
	'use strict'

	angular.module('data')
	.service('MenuDataService', MenuDataService);

	
	MenuDataService.$inject = ['$http', '$q'];
	function MenuDataService ($http, $q) {
		var service = this;

		service.getAllCategories = function () {
			var deferred = $q.defer();

			 var query = $http({
						method: 'GET',
						url: 'https://davids-restaurant.herokuapp.com/categories.json'
						});
			 deferred.resolve(query);
			 console.log("promise is: ", deferred.promise);
			 return deferred.promise;
						
		};

		service.getItemsForCategory = function (categoryShortName) {
			console.log("short name is: ", categoryShortName);
			var deferred = $q.defer();

			var query =  $http({
						method: 'GET',
						url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
						params: {category: categoryShortName}
						});
			deferred.resolve(query);

			console.log("get items for category promise is: ", deferred.promise);
		    return deferred.promise;
  		};



	};	

})();