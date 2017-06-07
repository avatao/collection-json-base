export interface DataJSON {
    name: string;
    value: string | number | boolean;
    prompt: string;
}

export class Data implements DataJSON {
    public name: string;
    public value: string | number | boolean;
    public prompt: string;

    constructor(data: DataJSON) {
        this.name = data.name;
        this.value = data.value;
        this.prompt = data.prompt;
    }

    public static parseArray(data: DataJSON[]): Data[] {
        const dataArray: Data[] = [];
        for (const d of data) {
            dataArray.push(new Data(d));
        }
        return dataArray;
    }

    public static findValue(dataArray: Data[], name: string): string | number | boolean {
        const result = dataArray.find((data) => data.name === name);
        return result && result.value || '';
    }

    public static findPrompt(dataArray: Data[], name: string): string {
        const result = dataArray.find((data) => data.name === name);
        return result && result.prompt || '';
    }
}
