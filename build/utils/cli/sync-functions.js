"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var signale_1 = __importDefault(require("signale"));
var chokidar_1 = __importDefault(require("chokidar"));
var path_1 = require("path");
var config_1 = require("../config");
var pg_1 = require("../pg");
var fileStatus = function (res, file) {
    if ('success' in res) {
        signale_1.default.success("Executed " + file);
    }
    else {
        signale_1.default.warn("Could not execute " + file + ". Error: " + res.error);
    }
};
var processFiles = function (config, pgClient, functionDir) { return __awaiter(_this, void 0, void 0, function () {
    var e_1, _a, files, files_1, files_1_1, file, fullFilePath, res, e_1_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, config_1.functionFiles(config)];
            case 1:
                files = _b.sent();
                signale_1.default.info("Found " + files.length + " files");
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, 9, 14]);
                files_1 = __asyncValues(files);
                _b.label = 3;
            case 3: return [4 /*yield*/, files_1.next()];
            case 4:
                if (!(files_1_1 = _b.sent(), !files_1_1.done)) return [3 /*break*/, 7];
                file = files_1_1.value;
                fullFilePath = path_1.resolve(functionDir, file);
                return [4 /*yield*/, pg_1.runQuery(pgClient, fullFilePath)];
            case 5:
                res = _b.sent();
                fileStatus(res, file);
                _b.label = 6;
            case 6: return [3 /*break*/, 3];
            case 7: return [3 /*break*/, 14];
            case 8:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 9:
                _b.trys.push([9, , 12, 13]);
                if (!(files_1_1 && !files_1_1.done && (_a = files_1.return))) return [3 /*break*/, 11];
                return [4 /*yield*/, _a.call(files_1)];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 13: return [7 /*endfinally*/];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.syncFunctions = function (cli, op) { return __awaiter(_this, void 0, void 0, function () {
    var config, pgClient, functionDir, watcher;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, config_1.hasConfig()];
            case 1:
                if (!(_a.sent())) {
                    signale_1.default.error('Config file does not exist. Please create one by running the `init` command.');
                    process.exit();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, config_1.configFile()];
            case 2:
                config = _a.sent();
                return [4 /*yield*/, pg_1.pgClientFactory(config.pg)];
            case 3:
                pgClient = _a.sent();
                if (!pgClient) {
                    process.exit();
                    return [2 /*return*/];
                }
                if (cli.parent.dir) {
                    config.dir = cli.parent.dir;
                }
                functionDir = config_1.functionDirPath(config);
                return [4 /*yield*/, config_1.hasFunctionDir(config)];
            case 4:
                if (!(_a.sent())) {
                    signale_1.default.error("Functions directory does not exist: " + functionDir);
                    process.exit();
                    return [2 /*return*/];
                }
                if (!cli.parent.watch) return [3 /*break*/, 6];
                signale_1.default.start('Starting in watch mode. Press Ctrl+C to exit.');
                return [4 /*yield*/, processFiles(config, pgClient, functionDir)];
            case 5:
                _a.sent();
                watcher = chokidar_1.default.watch(functionDir);
                watcher.on('change', function (path) { return __awaiter(_this, void 0, void 0, function () {
                    var res, fileName;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, pg_1.runQuery(pgClient, path)];
                            case 1:
                                res = _a.sent();
                                fileName = config_1.getFileName(path);
                                fileStatus(res, fileName);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 8];
            case 6:
                signale_1.default.start('Starting');
                return [4 /*yield*/, processFiles(config, pgClient, functionDir)];
            case 7:
                _a.sent();
                process.exit();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
