(function () {
  'use strict';

  var ShoppingList1 = [
  "Milk", "Coockies", "Choclate", "PB", "Pepto Bismol", "Apple", "Grapes", "Oranges"
  ];

  var shoppingList2 = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Coockies",
      quantity: "200"
    },
    {
      name: "Choclate",
      quantity: "5"
    },
    {
      name: "PB",
      quantity: "100"
    },
    {
      name: "Pepto Bismol",
      quantity: "67"
    },
    {
      name: "Apple",
      quantity: "6"
    },
    {
      name: "Grapes",
      quantity: "90"
    },
    {
      name: "Oranges",
      quantity: "27"
    },
  ];





  angular.module('MsgApp', [])
  .controller('MsgController', MsgController)
  

MsgController.$inject = ['$scope'];
  function MsgController($scope) {
   $scope.ShoppingList1 = ShoppingList1;
   $scope.shoppingList2 = shoppingList2;

   $scope.addToList = function() {
      var newItem = {
        name: $scope.newItemName,
        quantity: $scope.newItemQuantity
      }
      $scope.shoppingList2.push(newItem);
   };

  }




}) () ;
