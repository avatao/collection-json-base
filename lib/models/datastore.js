"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataStore = (function () {
    function DataStore() {
        this.dataStore = new Map();
    }
    DataStore.prototype.add = function (data) {
        this.dataStore.set(data.name, data);
    };
    DataStore.prototype.data = function (name) {
        var data = this.dataStore.get(name);
        if (typeof data !== 'undefined') {
            return data;
        }
        else {
            throw new Error('Key not found');
        }
    };
    DataStore.prototype.json = function () {
        var result = [];
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var data = _a[_i];
            result.push(data.json());
        }
        return result;
    };
    DataStore.prototype[Symbol.iterator] = function () {
        return this.dataStore.values();
    };
    return DataStore;
}());
exports.DataStore = DataStore;
