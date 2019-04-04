#!/usr/bin/env node
import cli from 'commander';
import { initConfig } from './utils/cli/init-config';
import { syncFunctions } from './utils/cli/sync-functions';

export const configFileName = 'pgfunctions.json';

cli.version('0.1.0')
    .description('Develop and maintain postgres functions in a sane way.')
    .option('-c --config', 'Config file name. Default: pgfunctions.json')
    .option('-d --dir [path]', 'Function directory')
    .option('-w --watch', 'Watch for changes')
    .parse(process.argv);

cli.command('init')
    .description('Init config file')
    .action(initConfig);

cli.command('run')
    .description('Sync functions to database')
    .action(syncFunctions);

cli.parse(process.argv);
