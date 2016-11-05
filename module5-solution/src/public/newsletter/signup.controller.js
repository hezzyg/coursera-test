(function(){

"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);


SignUpController.$inject = ['MenuService', 'UsersService'];
function SignUpController (MenuService, UsersService) {
	var $ctrl = this;

	$ctrl.submit = function (dish) {
		$ctrl.errorMsg = "";
		$ctrl.errorClass = false;				

		var promise = MenuService.getMenuItem(dish);

		promise.then(function (success) {
			console.log ("success is: ", success);
			var formInfo = {
				'fname': $ctrl.fname,
				'lname': $ctrl.lname,
				'email': $ctrl.email,
				'phone': $ctrl.phone,
				'dish': $ctrl.dish
			};
			$ctrl.storeuserInfo = UsersService.storeUserInfo(formInfo);
			

			// process promise
		}, function (reject) {
			$ctrl.errorMsg = "No such menu number exists";
			$ctrl.errorClass = true;
		});

		
	};

	$ctrl.checkDish = function (short_name) {
		var promise = MenuService.getMenuItem(short_name);

		promise.then(function(response) {
			$ctrl.signupform.dish.$setValidity("valid", true);
		}, function (reject) {
			$ctrl.signupform.dish.$setValidity("valid", false);
		});
	}
}


})();