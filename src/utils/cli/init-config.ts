import fs from 'fs-extra';
import path from 'path';
import signale from 'signale';
import { fullConfigPath } from '../config';

const emptyConfig = {
    pg: {
        user: '',
        host: '',
        database: '',
        password: '',
        port: '',
    },
    dir: '',
};

export const initConfig = () => {
    const fullPath = fullConfigPath();
    fs.writeJSON(fullPath, emptyConfig, {
        spaces: 4,
    })
        .then(() => {
            signale.success('Config file created');
        })
        .catch(() => {
            signale.error('Error creating config file');
        });
};
