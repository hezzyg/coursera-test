(function() {
'use strict'

angular.module('ShoppingList')
.service('WeightLossFilterService', WeightLossFilterService);


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