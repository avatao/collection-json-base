import { Data } from './data';

export interface DataArrayHolderJSON {
    data: Data[];
}

export class DataArrayHolder {
    public data: Data[];

    constructor(dah: DataArrayHolderJSON) {
        this.data = dah ? Data.parseArray(dah.data) : [];
    }

    public dataValue(name: string): string | number | boolean {
        return Data.findValue(this.data, name);
    }

    public dataPrompt(name: string): string {
        return Data.findPrompt(this.data, name);
    }

}
