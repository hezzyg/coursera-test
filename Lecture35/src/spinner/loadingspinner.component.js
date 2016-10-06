(function () {
'use strict'

angular.module('Spinner')
.component('loadingSpinner', {
	templateUrl: 'src/spinner/spinner.html',
	controller: SpinnerController
});


SpinnerController.$inject = ['$rootScope'];
function SpinnerController ($rootScope) {
	var $ctrl = this;

	$rootScope.$on('shoppinglist:processing', function (event, data) {
		console.log("event is: ", event);
		console.log("data is: ", data);

		if (data.on) { $ctrl.showSpinner = true}
			else ($ctrl.showSpinner = false)
	});

};

})();