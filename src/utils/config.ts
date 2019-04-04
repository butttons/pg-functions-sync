import fs from 'fs-extra';
import { resolve, parse } from 'path';
import { configFileName } from '../cli';
import { ClientConfig } from 'pg';

export interface PgFnConfig {
    pg: ClientConfig;
    dir: string;
}

export const fullConfigPath = (name: string = configFileName) => resolve(process.cwd(), name);
export const hasConfig = async () => {
    const configFile = fullConfigPath();
    return await fs.pathExists(configFile);
};
export const configFile = async () => {
    const configFile = fullConfigPath();
    return await fs.readJSON(configFile);
};
export const functionDirPath = (config: PgFnConfig) => {
    return resolve(process.cwd(), config.dir);
};
export const hasFunctionDir = async (config: PgFnConfig) => {
    const path = functionDirPath(config);
    return await fs.pathExists(path);
};
export const functionFiles = async (config: PgFnConfig) => {
    const dir = functionDirPath(config);
    return await fs.readdir(dir);
};
export const getFileName = (pathName: string) => {
    const parts = parse(pathName);
    return parts.base;
};
