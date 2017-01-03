(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchText = "";
  $scope.lunchItemMsg = ""
  $scope.colorValue = "green"
  $scope.processLunchText = function () {
    let items = $scope.lunchText.split(",");
    let numItems = 0
    for (let i of items)
      if(i) {
        console.log(i)
        numItems++
      }

    console.log(numItems);
    $scope.colorValue = "green"
    if (!numItems) {
      $scope.lunchItemMsg = "Please enter data first"
      $scope.colorValue = "red"
    }
    else if (numItems > 3 )
    {
      $scope.lunchItemMsg = "Too much!"      
    }
    else{
      $scope.lunchItemMsg = "Enjoy!"
    }
    console.log($scope.lunchItemMsg);
  };

}

})();
