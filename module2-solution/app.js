(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;
    
    toBuyCtrl.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    toBuyCtrl.markItemAsBought = function(index) {
        ShoppingListCheckOffService.markItemAsBought(index);
    }

    toBuyCtrl.areAllItemsBought = function() {
        return toBuyCtrl.toBuyItems.length === 0;
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtCtrl = this;

    alreadyBoughtCtrl.boughtItems = ShoppingListCheckOffService.getBoughtItems();

    alreadyBoughtCtrl.isSomethingBought = function() {
        return alreadyBoughtCtrl.boughtItems.length != 0;
    }
}

function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
        {
            name: "cookies",
            quantity: 20,
        },
        {
            name: "bags of chips",
            quantity: 14,
        },
        {
            name: "bottles of coke",
            quantity: 3,
        },
        {
            name: "boxes of chocolate",
            quantity: 5,
        },
        {
            name: "cakes",
            quantity: 2,
        },
    ];

    var boughtItems = [];

    service.markItemAsBought = function(index) {
        boughtItems.push(toBuyItems[index])
        toBuyItems.splice(index, 1);
    }

    service.getToBuyItems = function() {
        return toBuyItems;
    }

    service.getBoughtItems = function () {
        return boughtItems;
    }
}

})();
