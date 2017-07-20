import {Observable} from 'rxjs/Observable';
import {Template, TemplateJSON} from '../interfaces';
import {DataStore} from './datastore';
import {DataJSON} from '../interfaces/json';
import {CollectionBase} from './collection';
import {DataBase} from './data';

export abstract class TemplateBase implements Template {

    protected _dataStore: DataStore;

    static templateValidationExtensionCheck(data: DataBase): void {

        if (typeof data.required !== 'undefined' && data.required === true) {
            if (typeof data.value === 'undefined' && typeof data.array === 'undefined') {
                throw new Error(`The data with the name: '${data.name}' is required, but the value or array was not supplied.`);
            }
        }

        if (typeof data.regexp !== 'undefined') {
            if (typeof data.value !== 'undefined') {
                if (!RegExp(String(data.regexp)).test(String(data.value))) {
                    throw new Error(`The data with the name: '${data.name}' has the value: '${data.value}'.` +
                        `\nThis doesn't match the supplied regexp: '${data.regexp}'`);
                }
            } else if (typeof data.array !== 'undefined') {
                for (const item of data.array) {
                    if (!RegExp(String(data.regexp)).test(String(item))) {
                        throw new Error(`The data with the name: '${data.name}' has the array with values: '${data.array}'.` +
                            `\nThe value: '${item}' doesn't match the supplied regexp: '${data.regexp}'`);
                    }
                }
            }
        }
    }

    static validationsArrayExtensionCheck(data: DataBase): void {
        let wasError = false;

        if (typeof data.validations !== 'undefined') {
            for (const validation of data.validations) {
                switch (validation.name) {
                    case 'inclusion':

                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }

                        // Filter the arguments array where the value equals the current value, if empty error is thrown
                        if (typeof data.value !== 'undefined') {
                            wasError = validation.arguments.filter(argument => argument.value === data.value).length === 0;
                        } else if (typeof data.array !== 'undefined') {
                            // If not every value in the array is in the inclusion rule, error occurred
                            for (const item of data.array) {
                                const itemInWhitelist = validation.arguments.filter(argument => argument.value === item).length !== 0;
                                if (!itemInWhitelist) {
                                    wasError = true;
                                    break;
                                }
                            }
                        }
                        break;
                    case 'exclusion':

                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }

                        // Filter the arguments array where the value equals the current value, if not empty error is thrown
                        if (typeof data.value !== 'undefined') {
                            wasError = validation.arguments.filter(argument => argument.value === data.value).length > 0;
                        } else if (typeof data.array !== 'undefined') {
                            // If any value in the array is in the exclusion rule, error occurred
                            for (const item of data.array) {
                                const itemInBlackList = validation.arguments.filter(argument => argument.value === item).length !== 0;
                                if (itemInBlackList) {
                                    wasError = true;
                                    break;
                                }
                            }
                        }
                        break;
                    case 'format':

                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }

                        const regexp_argument = validation.arguments.find(argument => argument.name === 'regex');

                        if (typeof regexp_argument === 'undefined') {
                            break;
                        }

                        if (typeof data.value !== 'undefined') {
                            wasError = !RegExp(String(regexp_argument.value)).test(String(data.value));
                        } else if (typeof data.array !== 'undefined') {
                            // If any value in the array is not valid, error occurred
                            for (const item of data.array) {
                                const isValidItem = RegExp(String(regexp_argument.value)).test(String(item));
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

                        const lower_bound_argument = validation.arguments.find(argument => argument.name === 'lower_bound');
                        const upper_bound_argument = validation.arguments.find(argument => argument.name === 'upper_bound');

                        if (typeof lower_bound_argument === 'undefined' || typeof upper_bound_argument === 'undefined' ) {
                            break;
                        }

                        const lower_bound = Number(lower_bound_argument.value);
                        const upper_bound = Number(upper_bound_argument.value);

                        if (typeof data.value !== 'undefined') {
                            const valueLength = String(data.value).length;

                            if (!(valueLength >= lower_bound && valueLength <= upper_bound)) {
                                wasError = true;
                            }
                        } else if (typeof data.array !== 'undefined') {
                            // If any value in the array is not valid, error occurred
                            for (const item of data.array) {
                                const itemLength = String(item).length;
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
                            const fileType = (<string>data.value).split(';')[0].split(':')[1];
                            wasError = validation.arguments.filter(argument => fileType.includes(<string>argument.value)).length === 0;
                        } else if (typeof data.array !== 'undefined') {
                            // If any files in the array has an incorrect type, error occurred
                            for (const item of data.array) {
                                const fileType = (<string>item).split(';')[0].split(':')[1];
                                const isValidFileType = validation.arguments.filter(
                                        argument => fileType.includes(<string>argument.value)).length === 0;
                                if (isValidFileType) {
                                    wasError = true;
                                    break;
                                }
                            }
                        }
                        break;
                    case 'file_size':

                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }

                        const lower_file_bound_argument = validation.arguments.find(argument => argument.name === 'lower_bound');
                        const upper_file_bound_argument = validation.arguments.find(argument => argument.name === 'upper_bound');

                        if (typeof lower_file_bound_argument === 'undefined' || typeof upper_file_bound_argument === 'undefined' ) {
                            break;
                        }

                        const lower_file_bound = Number(lower_file_bound_argument.value);
                        const upper_file_bound = Number(upper_file_bound_argument.value);

                        // Expecting value to be Data URI with mime types
                        if (typeof data.value !== 'undefined') {
                            // Base64 encoding turns 6 bytes into 8, so we multiply by 3/4
                            const fileSize = (<string>data.value).length * (3 / 4);

                            if (!(fileSize >= lower_file_bound && fileSize <= upper_file_bound)) {
                                wasError = true;
                            }
                        } else if (typeof data.array !== 'undefined') {
                            for (const item of data.array) {
                                const fileSize = (<string>item).length * (3 / 4);
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
            }
        }
    }

    constructor(template: TemplateJSON) {
        this.parseData(template.data);
    }

    protected abstract parseData(data: DataJSON[]): void;
    public abstract submit(): Observable<CollectionBase>;
    public abstract update(): Observable<CollectionBase>;

    public json(): TemplateJSON {
        return { data: this._dataStore.json() };
    }

    public data(name: string): DataBase | undefined {
        return this._dataStore.data(name);
    }

    public allData(): DataStore {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore;
        } else {
            throw new Error('There are no data on this Template');
        }
    }

    public set(name: string, value: string | number | boolean ) {
        this._dataStore.setDataValue(name, value);
    }

    public setAll(body: {name: string, value: string | number | boolean}[]) {
        for (const item of body) {
            this.set(item.name, item.value);
        }
    }

    public setWithDataObject(dataObject: any) {
        for (const propertyName in dataObject) {
            if (dataObject.hasOwnProperty(propertyName)) {
                this.set(propertyName, dataObject[propertyName]);
            }
        }
    }

    public validate() {
        for (const data of this._dataStore) {
            TemplateBase.templateValidationExtensionCheck(data);
            TemplateBase.validationsArrayExtensionCheck(data);
        }
    }
}
