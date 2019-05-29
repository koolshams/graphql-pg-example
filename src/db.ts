import config from 'config';
import knex from 'knex';
import uniqid from 'uniqid';

export interface BaseObject {
    id: string;
    updated: number;
}

export class DBConnection {
    private db: knex;
    constructor() {
        this.db = knex({
            client: 'pg',
            connection: config.get('db')
        });
    }

    table(table: string) {
        return this.db(table);
    }

    async getAll<T>(table: string) {
        const result = await this.db(table).select('*');
        return result as T[];
    }

    async del(table: string, id: string) {
        await this.db(table)
            .where('id', id)
            .del();
        return id;
    }

    async insert(table: string, data: any) {
        await this.db(table).insert(data);
    }

    async getOne<T>(table: string, id: string) {
        const results = await this.db(table)
            .select('*')
            .where({ id });
        return results[0] as T;
    }

    async update(table: string, id: string, data: any) {
        await this.db(table)
            .where('id', id)
            .update(data);
    }
}
