import resolve from 'rollup-plugin-node-resolve';
import json from '@rollup/plugin-json';
/**
 * Add here external dependencies that actually you use.
 */
const externals = [
    'cors',
    'express',
    'body-parser',
    'axios',
    'rxjs',
    'class-transformer',
    'class-validator',
    '@google-cloud/firestore',
    '@google-cloud/logging-winston',
    'validated-base',
    'lodash',
    'winston',
    'moment',
    'eventemitter3',
    'reflect-metadata',
    'routing-controllers',
    'simple-cached-firestore',
    'firebase-functions',
    'firebase-admin',
];

export default {
    input: 'tmp/index.js',
    external: externals,
    plugins: [resolve(),json()],
    onwarn: () => { return },
    output: {
        file: 'lib/index.js',
        format: 'cjs',
        sourcemap: false
    }
}
