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
        let idx = data_array.findIndex((d) => d["name"] == name);
        return idx > -1 ? data_array[idx].value : "";
    }

    static findPrompt(data_array: Data[], name: string): string {
        let idx = data_array.findIndex((d) => d["name"] == name);
        return idx > -1 ? data_array[idx].prompt : "";
    }
}