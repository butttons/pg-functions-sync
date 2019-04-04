"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var signale_1 = __importDefault(require("signale"));
var config_1 = require("../config");
var emptyConfig = {
    pg: {
        user: '',
        host: '',
        database: '',
        password: '',
        port: '',
    },
    dir: '',
};
exports.initConfig = function () {
    var fullPath = config_1.fullConfigPath();
    fs_extra_1.default.writeJSON(fullPath, emptyConfig, {
        spaces: 4,
    })
        .then(function () {
        signale_1.default.success('Config file created');
    })
        .catch(function () {
        signale_1.default.error('Error creating config file');
    });
};
