(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.controller('ItemDirectiveController', ItemDirectiveController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', foundItemsDirective);

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'founditems.html',
    scope: {
      items: '=',
      onRemove: '&'
    },
    controller: ItemDirectiveController,
    controllerAs: 'fc',
    bindToController: true,
    link: ItemDirectiveLink,
    transclude: true
  };

  return ddo;
}

function ItemDirectiveController() {
}

function ItemDirectiveLink(scope, element, attrs, controller) {
  var link = this;
  console.log("Link scope is: ", scope);
  console.log("Controller instance is: ", controller);
  console.log("Element is: ", element);

  scope.$watch('fc.items.length', function (newValue, oldValue) {
    console.log("Old value: ", oldValue);
    console.log("New value: ", newValue);
    var warningElem = element.find('div.error');
    if (newValue!==undefined && newValue==0)
    {
      warningElem.slideDown(300);
    }
    else
    {
      warningElem.slideUp(300);
    }
  });
}


NarrowItDownController.$inject = ['MenuCategoriesService'];
function NarrowItDownController(MenuCategoriesService) {
  var menu = this;
  menu.searchText = ""
  menu.searched = false
  menu.dontWant = function(index) {
    console.log("removing item: ", menu.foundCategories[index])
    menu.foundCategories.splice(index, 1)
  }

  menu.getDetails =
    function()
    {
        MenuCategoriesService.getMenuCategories().then(
          function(response) {
            return MenuCategoriesService.getMenuForCategory(response.shortName)
          }
        ).then(
        function(categories) {
          menu.foundCategories = []
          //console.log("items: ",categories.data.menu_items[0]);
          for(let item of categories.data.menu_items) {
            if(menu.searchText && item.description.toLowerCase().indexOf(menu.searchText.toLowerCase()) != -1)
              menu.foundCategories.push(item)
          }
          menu.searched = true;
          console.log("RESPONSE DATA: ",menu.foundCategories)
        }
      )
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    };

}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

}

})();
