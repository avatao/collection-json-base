export interface DataJSON {
    name: string;
    value: string | number | boolean;
    prompt: string;
}

export interface DataAPI {}

export interface Data extends DataJSON, DataAPI {}

export class DataBase implements Data {
    public name: string;
    public value: string | number | boolean;
    public prompt: string;

    constructor(data: DataJSON) {
        this.name = data.name;
        this.value = data.value;
        this.prompt = data.prompt;
    }
}
