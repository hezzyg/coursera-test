(function () {
  'use strict';

  angular.module('MsgApp', [])
  .controller('MsgController', MsgController)
  .filter('loves', LovesFilter)
  .filter('truth', TruthFilter);

MsgController.$inject = ['$scope', '$filter', 'lovesFilter', 'truthFilter'];
  function MsgController($scope, $filter, lovesFilter, truthFilter) {
    $scope.name = "Hezzy";
    $scope.stateOfBeing = "hungry";
    $scope.coockieCost = .46;

    $scope.sayMessage = function () {
      var msg = "this is Hezzt he is hungry ";

      return $filter('uppercase')(msg);
    }

    $scope.sayLovesMessage = function () {
      var msg2 = "hezzy likes coockies ";
      return lovesFilter(msg2);
    }

    $scope.feedHezzy = function() {
      $scope.stateOfBeing = "full";
    }
  }

  function LovesFilter () {
    return function (input) {
      input = input || "";
      input = input.replace('likes', 'loves');
      return input;
    }
  }

  function TruthFilter () {
    return function (input, target, replace) {
      input = input || "";
      input = input.replace(target, replace);
      return input;
    }
  }




}) () ;
