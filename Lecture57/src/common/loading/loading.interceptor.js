(function (){
	"use strict";

	angular.module('common')
	.factory('loadingHttpInterceptor', LoadingHttpInterceptor);


	LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
	// tracks when a requezst is begins and finishes.
	
	function LoadingHttpInterceptor ($rootScope, $q) {

		var loadingCount = 0;
		var loadingEventName = 'spinner:activate';

		return {
			request: function (config) {
				console.log("Indise interceptor, config: ", config);
				if (++loadingCount === 1) {
					$rootScope.$broadcast(loadingEventName, {on:true});
				}

				return config;
			},

			response: function (response) {
				if (--loadingCount === 0) {
					$rootScope.$broadcast(loadingEventName, {on:false});
				}

				return response;
			},

			responseError: function (response) {
				if (--loadingCount === 0) {
					$rootScope.$broadcast(loadingEventName, {on:false});					
				}

				return $q.reject(response);
			}
		};
	}
})();