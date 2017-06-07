import { Data, DataBase, DataJSON } from './data';

export interface DataArrayHolderJSON {
    data: Data[];
}

export interface DataArrayHolderAPI {
    dataValue(name: string): string | number | boolean;
    dataPrompt(name: string): string;
}

export interface DataArrayHolder extends DataArrayHolderJSON, DataArrayHolderAPI {}

export class DataArrayHolderBase implements DataArrayHolder {
    public data: Data[];

    constructor(dah: DataArrayHolderJSON) {
        this.data = dah ? DataArrayHolderBase.parseArray(dah.data) : [];
    }

    public dataValue(name: string): string | number | boolean {
        return DataArrayHolderBase.findValue(this.data, name);
    }

    public dataPrompt(name: string): string {
        return DataArrayHolderBase.findPrompt(this.data, name);
    }

    private static findValue(dataArray: Data[], name: string): string | number | boolean {
        const result = dataArray.find((data) => data.name === name);
        return result && result.value || '';
    }

    private static findPrompt(dataArray: Data[], name: string): string {
        const result = dataArray.find((data) => data.name === name);
        return result && result.prompt || '';
    }

    public static parseArray(data: DataJSON[]): Data[] {
        const dataArray: Data[] = [];
        for (const d of data) {
            // TODO: decide if DataBase implementation is sufficient here, rewrite this if not
            dataArray.push(new DataBase(d));
        }
        return dataArray;
    }
}
