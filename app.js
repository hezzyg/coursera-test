(function () {
  'use strict';

  angular.module('MsgApp', [])
  .controller('MsgController', MsgController);

MsgController.$inject = ['$scope'];
  function MsgController($scope) {
    $scope.name = "Hezzy";
    $scope.stateOfBeing = "hungry";

    $scope.sayMessage = function () {
      return "fsdfdsf fdfs sdfdsf ";
    }

    $scope.feedHezzy = function() {
      $scope.stateOfBeing = "full";
    }
  }




}) () ;
