(function () {
  'use strict';

  angular.module('MsgApp', [])
  .controller('MsgController', MsgController)
  

MsgController.$inject = ['$scope', '$filter', '$timeout'];
  function MsgController($scope, $filter, $timeout) {
    $scope.name = "Hezzy";
    $scope.stateOfBeing = "hungry";
    $scope.coockieCost = .46;

    $scope.counter = 0;

    $scope.increment = function() {
      $timeout(function() {
        $scope.counter++;
        console.log ("counter incremented");
      }, 2000);
    };

    /*$scope.increment = function() {
      setTimeout(function () {
        $scope.$apply(function() {
          $scope.counter++;
          console.log ("counter incremented");
        });
      }, 2000);
    };*/
  }
    /*$scope.sayMessage = function () {
      var msg = "this is Hezzt he is hungry ";

      return $filter('uppercase')(msg);
    };

    $scope.sayLovesMessage = function () {
      var msg2 = "hezzy likes coockies ";
      return lovesFilter(msg2);
    };

    $scope.feedHezzy = function() {
      $scope.stateOfBeing = "full";
    };
  
    $scope.showNumberOfWatchers = function() {
      console.log("Watcher count is: ", $scope.$$watchersCount);
    };

    $scope.countOnce = function(){
      $scope.onceCounter = 1;
      console.log($scope.onceCounter);
    };

    $scope.$watch('onceCounter', function (newValue, OldValue) {
      console.log ("old value: ", OldValue);
      console.log("new value: ", newValue) ;
    });*/


  




}) () ;
