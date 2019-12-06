(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
              found: '<',
              onRemove: '&'
            },
        };

        return ddo;
        
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var narrow = this;
      narrow.searchTerm = "";
      narrow.search = function() {
        var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
      
        promise.then(function (response) {
          narrow.found = response.slice();
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log(narrow.found);
      };
      
      narrow.removeItem = function(itemIndex) {
        narrow.found.splice(itemIndex, 1);
      }
    }
    
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;
    
      service.getMatchedMenuItems = function (searchTerm) {
        var response = $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        }).then(function (result) {
            var foundItems = [];
            if (searchTerm !== "") {
              result.data.menu_items.forEach(item => {
                if (item.description.includes(searchTerm)) {
                  foundItems.push(item);
                }
              });
            }
            return foundItems;
        });
    
        return response;
      };   
    }
    
    })();
    