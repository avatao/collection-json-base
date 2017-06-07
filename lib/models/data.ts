export interface DataJSON {
    name: string;
    value: string | number | boolean;
    prompt: string;
}

export class Data implements DataJSON {
    name: string;
    value: string | number | boolean;
    prompt: string;

    constructor(data: DataJSON) {
        this.name = data["name"];
        this.value = data["value"];
        this.prompt = data["prompt"];
    }

    static parseArray(data: DataJSON[]): Data[] {
        let data_arr: Data[] = [];
        for (let d of data) {
            data_arr.push(new Data(d));
        }
        return data_arr;
    }

    static findValue(data_array: Data[], name: string) : string | number | boolean {
        let result = data_array.find((data) => data["name"] === name);
        return result && result.value || "";
    }

    static findPrompt(data_array: Data[], name: string): string {
        let result = data_array.find((data) => data["name"] === name)
        return result && result.prompt || "";
    }
}