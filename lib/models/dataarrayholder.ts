import { Data } from './data';

export interface DataArrayHolderJSON {
    data: Data[];
}

export class DataArrayHolder {
    data: Data[];

    constructor(dah: DataArrayHolderJSON) {
        this.data = dah ? Data.parseArray(dah["data"]) : [];
    }

    dataValue(name: string): string | number | boolean {
        return Data.findValue(this.data, name);
    }

    dataPrompt(name: string): string {
        return Data.findPrompt(this.data, name);
    }

}