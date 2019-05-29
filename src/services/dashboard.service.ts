import uniqid from 'uniqid';
import { DBConnection } from '../db';
import { Tab, Widget } from './dashboard.interfaces';

export const TAB = 'tab';
export const WIDGET = 'widget';

export class DashboardService {
    constructor(private db: DBConnection) {}

    public async getTabs() {
        return this.db.getAll<Tab>(TAB);
    }

    public async addTab(tab: Tab) {
        tab.id = uniqid();
        tab.updated = Date.now();
        await this.db.insert(TAB, tab);
        return tab;
    }

    public async removeTab(id: string) {
        await this.db.del(TAB, id);
        return id;
    }

    public async updateTab(tab: Tab) {
        await this.db.update(TAB, tab.id, {
            name: tab.name,
            updated: Date.now()
        })

        return this.db.getOne<Tab>(TAB, tab.id);
    }

    public async getWidgets() {
        const results = await this.db.getAll<Widget>(WIDGET);
        return results.map(this.parseWidget);
    }

    public async addWidget(widget: Widget) {
        const newWidget: Widget = {
            id: uniqid(),
            updated: Date.now(),
            position: JSON.stringify(widget.position),
            state: JSON.stringify(widget.state),
            tabId: widget.tabId
        };
        await this.db.insert(WIDGET, newWidget);
        return this.parseWidget(newWidget);
    }

    public async removeWidget(id: string) {
        await this.db.del(WIDGET, id);
        return id;
    }

    public async updateWidget(widget: Widget) {
        await this.db.update(WIDGET, widget.id, {
            position: JSON.stringify(widget.position),
            state: JSON.stringify(widget.state),
            updated: Date.now()
        })

        const updated = await this.db.getOne<Widget>(TAB, widget.id);
        return this.parseWidget(updated)
    }

    private parseWidget(widget: Widget): Widget {
        return {
            ...widget,
            position: JSON.parse(widget.position),
            state: JSON.parse(widget.state)
        }
    }
}
