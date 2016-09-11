(function () {
	'use strict';

	angular.module('LunchCheck', [])
	.controller('lunchCheckerController', lunchCheckerController);

	lunchCheckerController.$inject = ['$scope'];
	function lunchCheckerController($scope) {
		
		$scope.checkLunchItems = 
		function  () {
			if (countItems($scope.itemsList) == 0) {
				//do if less then 4				
				$scope.messageBox = "Please enter data first";
				$scope.fontColor = "red";
			} else if (countItems($scope.itemsList) < 4) {
						//DO if equal to 0
						$scope.messageBox = "Enjoy!";
						$scope.fontColor = "green";
					} else {
							//do if more then 3
							$scope.messageBox = "Too much!";
							$scope.fontColor = "green";
						}
		}


		function countEmptyItems (list) {
			
			var count = 0;
			for (var i = 0; i < (list.length-1); i++) {
				if (list.charAt(i) == list.charAt(i+1) && list.charAt(i) == ",") {
					count++;
				}
			}
			if (list.charAt(list.length-1) == ",") { 
				count++;
			}			
			return count;
		}


		function countItems (itemsList) {

			if (itemsList) {
				itemsList = itemsList.replace(/\s/g, '');
				var emptyCommas = countEmptyItems (itemsList);
				if (itemsList.length == 0) {
					return 0;
				} else return (itemsList.split(',').length - emptyCommas);					
			} else return 0;
		}
		
	}

}) () ;