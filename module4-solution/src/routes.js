(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
    })

    // Categories list page
    .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/categories-list.template.html',
        controller: 'CategoriesListController as categoriesList',
        resolve: {
            categories: ['MenuDataService', function sucess(MenuDataService) {
                return MenuDataService.getAllCategories().then(function (response) {
                    return response.data;
                }, function (response) {
                    return null;
                });
            }]
        }
    })

    .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/menuapp/templates/items-list.template.html',
        controller: "ItemsListController as itemsList",
        resolve: {
            items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName).then(function (response) {
                    console.log("response: ", response);
                    return response.data.menu_items;
                }, function (response) {
                    return null;
                });
            }]
        }
    });

}

})();
