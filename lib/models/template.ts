import { Data } from './data'

export interface TemplateJSON {
    data: Data[];
}

export class Template implements TemplateJSON {
    data: Data[];

    constructor(template: TemplateJSON) {
        this.data = template ? Data.parseArray(template["data"]) : [];
    }
}