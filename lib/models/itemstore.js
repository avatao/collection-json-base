"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemStore = (function () {
    function ItemStore(items) {
        this._items = items;
    }
    ItemStore.prototype.add = function (item) {
        this._items.push(item);
    };
    /**
     * Returns the items array
     * @returns {Item[]} the items array
     */
    ItemStore.prototype.items = function () {
        return this._items;
    };
    /**
     * This method will return the first item of the items array
     * regardless of the number of items in the array
     * @returns {Item} the first item in the array
     */
    ItemStore.prototype.first = function () {
        return this._items[0];
    };
    /**
     * This method will return the first item of the items array, if there is only one value
     * It will fail otherwise
     * @returns {Item} the first and only item in the array
     */
    ItemStore.prototype.one = function () {
        if (this._items.length === 0) {
            return this.first();
        }
        else {
            throw new Error("The item array contains more than one values, use first() if you are sure you need the first one only!");
        }
    };
    ItemStore.prototype.json = function () {
        var result = [];
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            result.push(item.json());
        }
        return result;
    };
    ItemStore.prototype[Symbol.iterator] = function () {
        return this._items.values();
    };
    return ItemStore;
}());
exports.ItemStore = ItemStore;
