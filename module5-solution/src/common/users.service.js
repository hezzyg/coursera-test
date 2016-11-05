(function() {
"use stirct";

angular.module('common')
.service('UsersService', UsersService);


UsersService.$inject = [];
function UsersService () {
	var service = this;
	var currentUser;
	/*var currentUser = {
		'fname': 'Please first sign up',
		'lname': 'In oreder to see you details',
		'email': 'example@com.com',
		'phone': '000-000-0000',
		'dish': ''
		};*/

	service.storeUserInfo = function (form) {
		console.log('storeUserService is called!!! ', form);
		currentUser = form;
		return "Your information has been saved";
	};

	service.getUserInfo = function () {
		return currentUser;
	};
}



})();
