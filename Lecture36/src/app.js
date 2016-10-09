(function () {
	'use strict'

	angular.module('RountingApp', ['ui.router']);

	angular.module('RountingApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig ($stateProvider, $urlRouterProvider) {

		//Redirect to Tab 1 if no other URL matches
		$urlRouterProvider.otherwise('/tab1');

		//setUp UI states
		$stateProvider
		.state('tab1', {
			url: '/tab1',
			templateUrl: 'src/tab1.html'
		})

		.state('tab2', {
			url: '/tab2',
			templateUrl: 'src/tab2.html'
		});

	};

})();