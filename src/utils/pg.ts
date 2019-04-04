import { Client, ClientConfig } from 'pg';
import signale from 'signale';
import { readFile } from 'fs-extra';
import { resolve } from 'path';
import { PgFnConfig } from './config';

export const pgClientFactory = async (config: ClientConfig) => {
    let client: boolean | Client = new Client(config);
    await client.connect().catch((err: Error) => {
        signale.error('Could not connect to postgres database', err.message);
        client = false;
    });
    return client;
};

export const runQuery = async (client: any, fullPath: string) => {
    const query = await readFile(fullPath, { encoding: 'utf8' });
    let res: any = { success: true };
    await client.query(query).catch((err: Error) => {
        res = { error: err.message };
    });
    return res;
};
