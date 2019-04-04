import { CommanderStatic } from 'commander';
import signale from 'signale';
import chokidar from 'chokidar';
import { resolve } from 'path';

import { hasConfig, configFile, hasFunctionDir, functionFiles, functionDirPath, PgFnConfig, getFileName } from '../config';
import { pgClientFactory, runQuery } from '../pg';

const fileStatus = (res: any, file: string) => {
    if ('success' in res) {
        signale.success(`Executed ${file}`);
    } else {
        signale.warn(`Could not execute ${file}. Error: ${res.error}`);
    }
};
const processFiles = async (config: PgFnConfig, pgClient: any, functionDir: string) => {
    const files = await functionFiles(config);
    signale.info(`Found ${files.length} files`);

    for await (let file of files) {
        const fullFilePath = resolve(functionDir, file);
        const res = await runQuery(pgClient, fullFilePath);
        fileStatus(res, file);
    }
};

export const syncFunctions = async (cli: CommanderStatic, op: any) => {
    if (!(await hasConfig())) {
        signale.error('Config file does not exist. Please create one by running the `init` command.');
        process.exit();
        return;
    }
    const config = await configFile();
    const pgClient = await pgClientFactory(config.pg);
    if (!pgClient) {
        process.exit();
        return;
    }
    if (cli.parent.dir) {
        config.dir = cli.parent.dir;
    }
    const functionDir = functionDirPath(config);

    if (!(await hasFunctionDir(config))) {
        signale.error(`Functions directory does not exist: ${functionDir}`);
        process.exit();
        return;
    }
    if (cli.parent.watch) {
        signale.start('Starting in watch mode. Press Ctrl+C to exit.');
        await processFiles(config, pgClient, functionDir);
        const watcher = chokidar.watch(functionDir);
        watcher.on('change', async (path) => {
            const res = await runQuery(pgClient, path);
            const fileName = getFileName(path);
            fileStatus(res, fileName);
        });
    } else {
        signale.start('Starting');
        await processFiles(config, pgClient, functionDir);
        process.exit();
    }
};
