(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.service('ShoppingListService', ShoppingListService);


// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListService'];
function ShoppingListController1(ShoppingListService) {
  var list1 = this;

  // Use factory to create new shopping list service
  //var shoppingList = ShoppingListFactory(6);

  list1.items = ShoppingListService.getItems();

  list1.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  }
}


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListService'];
function ShoppingListController2(ShoppingListService) {
  var list2 = this;

  // Use factory to create new shopping list service
  //ar shoppingList = ShoppingListFactory();

  list2.items = ShoppingListService.getboughtItems();

}


// If not specified, maxItems assumed unlimited
function ShoppingListService() {
  var maxItems = 6;
  var service = this;

  // List of shopping items
  var items = [];
  var boughtItems = []

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };
  for (var i=0; i < maxItems; i++)
     service.addItem("cookies","10")

  service.removeItem = function (itemIndex) {
    boughtItems.push(items[itemIndex])
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getboughtItems = function () {
    return boughtItems;
  };
}


})();
