#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var init_config_1 = require("./utils/cli/init-config");
var sync_functions_1 = require("./utils/cli/sync-functions");
exports.configFileName = 'pgfunctions.json';
commander_1.default.version('0.1.0')
    .description('Develop and maintain postgres functions in a sane way.')
    .option('-c --config', 'Config file name. Default: pgfunctions.json')
    .option('-d --dir [path]', 'Function directory')
    .option('-w --watch', 'Watch for changes')
    .parse(process.argv);
commander_1.default.command('init')
    .description('Init config file')
    .action(init_config_1.initConfig);
commander_1.default.command('run')
    .description('Sync functions to database')
    .action(sync_functions_1.syncFunctions);
commander_1.default.parse(process.argv);
