import { BaseObject } from '../db';

export interface Tab extends BaseObject {
    name: string;
}

export interface Widget extends BaseObject {
    tabId: string;
    state: any;
    position: any;
}
