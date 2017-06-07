import { DataArrayHolder, DataArrayHolderJSON } from './dataarrayholder';

export interface TemplateJSON extends DataArrayHolderJSON {
}

export class Template extends DataArrayHolder implements TemplateJSON {
    constructor(template: TemplateJSON) {
        super(template);
    }
}
