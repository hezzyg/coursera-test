(function () {
	'use strict'

	angular.module('Spinner')
	.component('loadingSpinner', {
		templateUrl: 'src/spinner/loadingspinner.template.html',
		controller: SpinnerController
	});

	SpinnerController.$inject = ['$rootScope'];
	function SpinnerController ($rootScope) {
		var $ctrl = this;
		// an array of cnacellers so we can cancel / shutdown listners when we finish
		var cancellers = [];

		$ctrl.$onInit = function () {
			// listen to stateChangeStart
			var cancel = $rootScope.$on('$stateChangeStart', 
			function (event, toState, toParams, fromState, fromParams, options) {
				$ctrl.showSpinner = true;
			});
			cancellers.push(cancel);

			// listen to stateChangeSuccess
			cancel = $rootScope.$on('$stateChangeSuccess', 
			function (evet, toState, toParams, fromState, fromParams) {
				$ctrl.showSpinner = false;
			});
			cancellers.push(cancel);

			// listen to stateChangeError
			cancel = $rootScope.$on('$stateChangeError',
			function (evet, toState, toParams, fromState, fromParams, error) {
				$ctrl.showSpinner = false;
			});
			cancellers.push(cancel);

			$ctrl.onDestroy = function () {
				cancellers.forEach(function(item) {
					item();
				});
			};

		};
	};
})();