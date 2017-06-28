"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateBase = (function () {
    function TemplateBase(template) {
        this.parseData(template.data);
    }
    TemplateBase.templateValidationExtensionCheck = function (data) {
        if (typeof data.required !== 'undefined' && data.required === true) {
            if (typeof data.value === 'undefined' && typeof data.array === 'undefined') {
                throw new Error("The data with the name: '" + data.name + "' is required, but the value or array was not supplied.");
            }
        }
        if (typeof data.regexp !== 'undefined') {
            if (typeof data.value !== 'undefined') {
                if (!RegExp(String(data.regexp)).test(String(data.value))) {
                    throw new Error("The data with the name: '" + data.name + "' has the value: '" + data.value + "'." +
                        ("\nThis doesn't match the supplied regexp: '" + data.regexp + "'"));
                }
            }
            else if (typeof data.array !== 'undefined') {
                for (var _i = 0, _a = data.array; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (!RegExp(String(data.regexp)).test(String(item))) {
                        throw new Error("The data with the name: '" + data.name + "' has the array with values: '" + data.array + "'." +
                            ("\nThe value: '" + item + "' doesn't match the supplied regexp: '" + data.regexp + "'"));
                    }
                }
            }
        }
    };
    TemplateBase.validationsArrayExtensionCheck = function (data) {
        var wasError = false;
        if (typeof data.validations !== 'undefined') {
            var _loop_1 = function (validation) {
                switch (validation.name) {
                    case 'inclusion':
                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }
                        // Filter the arguments array where the value equals the current value, if empty error is thrown
                        if (typeof data.value !== 'undefined') {
                            wasError = validation.arguments.filter(function (argument) { return argument.value === data.value; }).length === 0;
                        }
                        else if (typeof data.array !== 'undefined') {
                            var _loop_2 = function (item) {
                                var itemInWhitelist = validation.arguments.filter(function (argument) { return argument.value === item; }).length !== 0;
                                if (!itemInWhitelist) {
                                    wasError = true;
                                    return "break";
                                }
                            };
                            // If not every value in the array is in the inclusion rule, error occurred
                            for (var _i = 0, _a = data.array; _i < _a.length; _i++) {
                                var item = _a[_i];
                                var state_1 = _loop_2(item);
                                if (state_1 === "break")
                                    break;
                            }
                        }
                        break;
                    case 'exclusion':
                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }
                        // Filter the arguments array where the value equals the current value, if not empty error is thrown
                        if (typeof data.value !== 'undefined') {
                            wasError = validation.arguments.filter(function (argument) { return argument.value === data.value; }).length > 0;
                        }
                        else if (typeof data.array !== 'undefined') {
                            var _loop_3 = function (item) {
                                var itemInBlackList = validation.arguments.filter(function (argument) { return argument.value === item; }).length !== 0;
                                if (itemInBlackList) {
                                    wasError = true;
                                    return "break";
                                }
                            };
                            // If any value in the array is in the exclusion rule, error occurred
                            for (var _b = 0, _c = data.array; _b < _c.length; _b++) {
                                var item = _c[_b];
                                var state_2 = _loop_3(item);
                                if (state_2 === "break")
                                    break;
                            }
                        }
                        break;
                    case 'format':
                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }
                        var regexp_argument = validation.arguments.find(function (argument) { return argument.name === 'regex'; });
                        if (typeof regexp_argument === 'undefined') {
                            break;
                        }
                        if (typeof data.value !== 'undefined') {
                            wasError = !RegExp(String(regexp_argument.value)).test(String(data.value));
                        }
                        else if (typeof data.array !== 'undefined') {
                            // If any value in the array is not valid, error occurred
                            for (var _d = 0, _e = data.array; _d < _e.length; _d++) {
                                var item = _e[_d];
                                var isValidItem = RegExp(String(regexp_argument.value)).test(String(item));
                                if (!isValidItem) {
                                    wasError = true;
                                    break;
                                }
                            }
                        }
                        break;
                    case 'length':
                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }
                        var lower_bound_argument = validation.arguments.find(function (argument) { return argument.name === 'lower_bound'; });
                        var upper_bound_argument = validation.arguments.find(function (argument) { return argument.name === 'upper_bound'; });
                        if (typeof lower_bound_argument === 'undefined' || typeof upper_bound_argument === 'undefined') {
                            break;
                        }
                        var lower_bound = Number(lower_bound_argument.value);
                        var upper_bound = Number(upper_bound_argument.value);
                        if (typeof data.value !== 'undefined') {
                            var valueLength = String(data.value).length;
                            if (!(valueLength >= lower_bound && valueLength <= upper_bound)) {
                                wasError = true;
                            }
                        }
                        else if (typeof data.array !== 'undefined') {
                            // If any value in the array is not valid, error occurred
                            for (var _f = 0, _g = data.array; _f < _g.length; _f++) {
                                var item = _g[_f];
                                var itemLength = String(item).length;
                                if (!(itemLength >= lower_bound && itemLength <= upper_bound)) {
                                    wasError = true;
                                    break;
                                }
                            }
                        }
                        break;
                    case 'file_type':
                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }
                        // Expecting value to be Data URI with mime types
                        if (typeof data.value !== 'undefined') {
                            var fileType_1 = data.value.split(';')[0].split(':')[1];
                            wasError = validation.arguments.filter(function (argument) { return fileType_1.includes(argument.value); }).length === 0;
                        }
                        else if (typeof data.array !== 'undefined') {
                            var _loop_4 = function (item) {
                                var fileType = item.split(';')[0].split(':')[1];
                                var isValidFileType = validation.arguments.filter(function (argument) { return fileType.includes(argument.value); }).length === 0;
                                if (isValidFileType) {
                                    wasError = true;
                                    return "break";
                                }
                            };
                            // If any files in the array has an incorrect type, error occurred
                            for (var _h = 0, _j = data.array; _h < _j.length; _h++) {
                                var item = _j[_h];
                                var state_3 = _loop_4(item);
                                if (state_3 === "break")
                                    break;
                            }
                        }
                        break;
                    case 'file_size':
                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }
                        var lower_file_bound_argument = validation.arguments.find(function (argument) { return argument.name === 'lower_bound'; });
                        var upper_file_bound_argument = validation.arguments.find(function (argument) { return argument.name === 'upper_bound'; });
                        if (typeof lower_file_bound_argument === 'undefined' || typeof upper_file_bound_argument === 'undefined') {
                            break;
                        }
                        var lower_file_bound = Number(lower_file_bound_argument.value);
                        var upper_file_bound = Number(upper_file_bound_argument.value);
                        // Expecting value to be Data URI with mime types
                        if (typeof data.value !== 'undefined') {
                            // Base64 encoding turns 6 bytes into 8, so we multiply by 3/4
                            var fileSize = data.value.length * (3 / 4);
                            if (!(fileSize >= lower_file_bound && fileSize <= upper_file_bound)) {
                                wasError = true;
                            }
                        }
                        else if (typeof data.array !== 'undefined') {
                            for (var _k = 0, _l = data.array; _k < _l.length; _k++) {
                                var item = _l[_k];
                                var fileSize = item.length * (3 / 4);
                                if (!(fileSize >= lower_file_bound && fileSize <= upper_file_bound)) {
                                    wasError = true;
                                    break;
                                }
                            }
                        }
                        break;
                    case 'presence':
                        if (typeof data.value === 'undefined' && typeof data.array === 'undefined') {
                            wasError = true;
                        }
                        break;
                    default:
                        // Invalid rule, ignore it
                        break;
                }
                if (wasError) {
                    throw new Error(validation.message || 'Validation failed');
                }
            };
            for (var _i = 0, _a = data.validations; _i < _a.length; _i++) {
                var validation = _a[_i];
                _loop_1(validation);
            }
        }
    };
    TemplateBase.prototype.json = function () {
        return { data: this.dataStore.json() };
    };
    TemplateBase.prototype.data = function (name) {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.data(name);
        }
        else {
            throw new Error('This template has no data array!');
        }
    };
    TemplateBase.prototype.set = function (name, value) {
        this.dataStore.data(name).value = value;
    };
    TemplateBase.prototype.setAll = function (body) {
        for (var _i = 0, body_1 = body; _i < body_1.length; _i++) {
            var item = body_1[_i];
            this.set(item.name, item.value);
        }
    };
    TemplateBase.prototype.validate = function () {
        for (var _i = 0, _a = this.dataStore; _i < _a.length; _i++) {
            var data = _a[_i];
            TemplateBase.templateValidationExtensionCheck(data);
            TemplateBase.validationsArrayExtensionCheck(data);
        }
    };
    return TemplateBase;
}());
exports.TemplateBase = TemplateBase;
