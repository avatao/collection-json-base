"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorBase = (function () {
    function ErrorBase(error) {
        if (error.title) {
            this.title = error.title;
        }
        if (error.code) {
            this.code = error.code;
        }
        if (error.message) {
            this.message = error.message;
        }
    }
    ErrorBase.prototype.json = function () {
        var result = {};
        if (this.title) {
            result.title = this.title;
        }
        if (this.code) {
            result.code = this.code;
        }
        if (this.message) {
            result.message = this.message;
        }
        return result;
    };
    return ErrorBase;
}());
exports.ErrorBase = ErrorBase;
