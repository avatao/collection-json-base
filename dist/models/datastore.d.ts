import { Data } from '../interfaces/data';
export declare class DataStore {
    private dataStore;
    constructor(dataArray?: Data[]);
    add(data: Data): void;
    data(name: string): Data;
}
