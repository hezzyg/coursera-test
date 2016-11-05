(function() {
	"use strict";

	angular.module('public')
	.component('menuItem',{
		templateUrl: 'src/public/menu-items/single-menu-item.html',
		bindings: {
			item: '<'
		},
		controller: MenuItemController
	});

	MenuItemController.$inject = ['ApiPath'];
	function MenuItemController (ApiPath) {
		var $ctrl = this;
		$ctrl.basePath = ApiPath;
	}

})();