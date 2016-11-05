(function() {
	"use strict";

	angular.module('common')
	.controller('UsersController', UsersController);


	UsersController.$inject = ['userInfo', 'MenuService', 'ApiPath'];
	function UsersController (userInfo, MenuService, ApiPath) {
		var $ctrl = this;

		$ctrl.userInfo = userInfo;		
		$ctrl.basePath = ApiPath;

		if (userInfo) {
			var promise = MenuService.getMenuItem(userInfo.dish);
			promise.then(function(item) {								
				$ctrl.item = item;

			}, function(reject) {
				$ctrl.error = "Sorry, We could not find your favorite dish info";
			});

		} else {
			$ctrl.signupMsg = 'Not Signed Up Yet. ';
			$ctrl.signupLink = "Sign up Now!"
		}
	}


})();