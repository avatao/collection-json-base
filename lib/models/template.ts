import { DataArrayHolderBase, DataArrayHolderJSON } from './dataarrayholder';

export interface TemplateJSON extends DataArrayHolderJSON {}

export interface TemplateAPI {}

export interface Template extends TemplateJSON, TemplateAPI {}

export class TemplateBase extends DataArrayHolderBase implements Template {
    constructor(template: TemplateJSON) {
        super(template);
    }
}
