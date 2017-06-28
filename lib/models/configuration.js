"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollectionConfiguration = (function () {
    function CollectionConfiguration() {
    }
    return CollectionConfiguration;
}());
exports.CollectionConfiguration = CollectionConfiguration;
var CollectionConfigurationManager = (function () {
    function CollectionConfigurationManager() {
    }
    CollectionConfigurationManager.getHttpService = function () {
        if (typeof CollectionConfiguration.httpService !== 'undefined') {
            return CollectionConfiguration.httpService;
        }
        else {
            throw new Error('You need to set the http service -> CollectionConfigurationManager.setHttpService<\T>(http)');
        }
    };
    CollectionConfigurationManager.setHttpService = function (httpService) {
        CollectionConfiguration.httpService = httpService;
    };
    return CollectionConfigurationManager;
}());
exports.CollectionConfigurationManager = CollectionConfigurationManager;
