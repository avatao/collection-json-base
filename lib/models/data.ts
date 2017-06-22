import {Data} from '../interfaces/data';
import {DataJSON, ValidationJSON} from '../interfaces/json';

export class DataBase implements Data {
    public name: string;
    public value?: string | number | boolean;
    public prompt?: string;
    public validations?: ValidationJSON[];

    constructor(data: DataJSON) {
        this.name = data.name;

        if (data.value) {
            this.value = data.value;
        }

        if (data.prompt) {
            this.prompt = data.prompt;
        }

        if (data.validations) {
            this.validations = data.validations;
        }
    }

    public json(): DataJSON {
        const result: DataJSON = {name: this.name};

        if (this.value) {
            result.value = this.value;
        }

        if (this.prompt) {
            result.prompt = this.prompt;
        }

        if (this.validations) {
            result.validations = this.validations;
        }

        return result;
    }
}
