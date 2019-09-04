(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.check = function() {
        var dishesList = [];
        if ($scope.dishesString) {
            dishesList = $scope.dishesString.split(',');
        }
        if (dishesList.length == 0)
        {
            $scope.message = "Please enter data first";
        } else {
            if (dishesList.length > 3) {
                $scope.message = "Too Much!";
            } else {
                $scope.message = "Enjoy!";
            }
        }
    };
}

})();
