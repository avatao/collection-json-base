import {Data} from '../interfaces/data';
import {DataJSON, ValidationJSON} from '../interfaces/json';

export class DataBase implements Data {
    public name: string;
    public value?: string | number | boolean;
    public array?: (string | number | boolean)[];
    public object?: any;
    public prompt?: string;
    public regexp?: string;
    public required?: boolean;
    public validations?: ValidationJSON[];

    constructor(data: DataJSON) {
        this.name = data.name;

        if (typeof data.value !== 'undefined') {
            this.value = data.value;
        }

        if (typeof data.array !== 'undefined') {
            this.array = data.array;
        }

        if (typeof data.object !== 'undefined') {
            this.object = data.object;
        }

        if (typeof data.prompt !== 'undefined') {
            this.prompt = data.prompt;
        }

        if (typeof data.regexp !== 'undefined') {
            this.regexp = data.regexp;
        }

        if (typeof data.required !== 'undefined') {
            this.required = data.required;
        }

        if (typeof data.validations !== 'undefined') {
            this.validations = data.validations;
        }
    }

    public json(): DataJSON {
        const result: DataJSON = {name: this.name};

        if (typeof this.value !== 'undefined') {
            result.value = this.value;
        }

        if (typeof this.array !== 'undefined') {
            result.array = this.array;
        }

        if (typeof this.object !== 'undefined') {
            result.object = this.object;
        }

        if (typeof this.prompt !== 'undefined') {
            result.prompt = this.prompt;
        }

        if (typeof this.regexp !== 'undefined') {
            result.regexp = this.regexp;
        }

        if (typeof this.required !== 'undefined') {
            result.required = this.required;
        }

        if (typeof this.validations !== 'undefined') {
            result.validations = this.validations;
        }

        return result;
    }
}
