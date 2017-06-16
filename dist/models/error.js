"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorBase {
    constructor(error) {
        if (error) {
            this.title = error.title;
            this.code = error.code;
            this.message = error.message;
        }
    }
}
exports.ErrorBase = ErrorBase;
//# sourceMappingURL=error.js.map