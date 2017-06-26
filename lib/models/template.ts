import {Observable} from 'rxjs/Observable';
import {Collection, Template, TemplateJSON} from '../interfaces';
import {DataStore} from './datastore';
import {DataJSON} from '../interfaces/json';
import {Data} from '../interfaces/data';

export abstract class TemplateBase implements Template {

    public dataStore: DataStore;

    static templateValidationExtensionCheck(data: Data): void {
        if (typeof data.value !== 'undefined') {
            if (typeof data.regexp !== 'undefined') {
                if (!RegExp(String(data.regexp)).test(String(data.value))) {
                    throw new Error(`The data with the name: ${data.name} has the value: ${data.value} and the value
                   doesn't match the supplied regexp: ${data.regexp}`)
                }
            }
        } else if (data.required === true) {
            throw new Error(`The data with the name: ${data.name} is missing its value but it is required.`)
        }
    }

    static validationsArrayExtensionCheck(data: Data): void {
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
                        }
                        break;
                    case 'exclusion':

                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }

                        // Filter the arguments array where the value equals the current value, if not empty error is thrown
                        if (typeof data.value !== 'undefined') {
                            wasError = validation.arguments.filter(argument => argument.value === data.value).length > 0;
                        }
                        break;
                    case 'format':

                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }

                        if (typeof data.value !== 'undefined') {
                            const regexp_argument = validation.arguments.find(argument => argument.name === 'regex');

                            if (typeof regexp_argument === 'undefined') {
                                break;
                            }

                            wasError = !RegExp(String(regexp_argument.value)).test(String(data.value));
                        }
                        break;
                    case 'length':

                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }

                        if (typeof data.value !== 'undefined') {
                            const lower_bound_argument = validation.arguments.find(argument => argument.name === 'lower_bound');
                            const upper_bound_argument = validation.arguments.find(argument => argument.name === 'upper_bound');

                            if (typeof lower_bound_argument === 'undefined' || typeof upper_bound_argument === 'undefined' ) {
                                break;
                            }

                            const lower_bound = Number(lower_bound_argument.value);
                            const upper_bound = Number(upper_bound_argument.value);
                            const valueLength = String(data.value).length;

                            if (!(valueLength >= lower_bound && valueLength <= upper_bound)) {
                                wasError = true;
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
                            wasError = validation.arguments.filter(
                                    argument => (<string>argument.value).includes(fileType)).length === 0;
                        }
                        break;
                    case 'file_size':

                        if (typeof validation.arguments === 'undefined') {
                            break;
                        }

                        // Expecting value to be Data URI with mime types
                        if (typeof data.value !== 'undefined') {
                            // Base64 encoding turns 6 bytes into 8, so we multiply by 3/4
                            const fileSize = (<string>data.value).length * (3 / 4);
                            const lower_bound_argument = validation.arguments.find(argument => argument.name === 'lower_bound');
                            const upper_bound_argument = validation.arguments.find(argument => argument.name === 'upper_bound');

                            if (typeof lower_bound_argument === 'undefined' || typeof upper_bound_argument === 'undefined' ) {
                                break;
                            }

                            const lower_bound = Number(lower_bound_argument.value);
                            const upper_bound = Number(upper_bound_argument.value);

                            if (!(fileSize >= lower_bound && fileSize <= upper_bound)) {
                                wasError = true;
                            }
                        }
                        break;
                    case 'presence':
                        if (typeof data.value === 'undefined') {
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
    public abstract submit(): Observable<Collection>;
    public abstract update(): Observable<Collection>;

    public json(): TemplateJSON {
        return { data: this.dataStore.json() }
    }

    public data(name: string): Data {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.data(name);
        } else {
            throw new Error('This template has no data array!')
        }
    }

    public set(name: string, value: string | number | boolean ) {
        this.dataStore.data(name).value = value;
    }

    public setAll(body: {name: string, value: string | number | boolean}[]) {
        for (const item of body) {
            this.set(item.name, item.value);
        }
    }

    public validate() {
        for (const data of this.dataStore) {
            TemplateBase.templateValidationExtensionCheck(data);
            TemplateBase.validationsArrayExtensionCheck(data);
        }
    }
}
