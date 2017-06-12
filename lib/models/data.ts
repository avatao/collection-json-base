export interface DataJSON {
    name: string;
    value: string | number | boolean;
    prompt: string;
}

export interface DataAPI {}

export interface Data extends DataJSON, DataAPI {}
