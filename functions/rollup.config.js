import resolve from 'rollup-plugin-node-resolve';
import json from '@rollup/plugin-json';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';
import path from 'path';

// eslint-disable-next-line no-shadow
const onwarn = (warning, onwarn) =>
	(warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
	(warning.code === "CIRCULAR_DEPENDENCY" &&
		/[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

export default {
    input: 'tmp/index.js',
    output: {
        file: 'lib/index.js',
        format: 'cjs',
        // plugins: [terser()],
        sourcemap: true
    },
    plugins: [
        replace({
            'process.browser': false,
            'process.env.NODE_ENV': JSON.stringify(mode),
        }),
        resolve({
            mainFields: ['main', 'module', 'browser'],
            main: true,
            browser: false,
            preferBuiltins: false
        }),
        json(),
        commonjs({
            include: "node_modules/**",
            exclude: ["node_modules/aws-sdk/**"]
        }),
        builtins()
    ],
    external: Object.keys(pkg.dependencies).concat(
        require("module").builtinModules
    ),

    preserveEntrySignatures: "strict",
    onwarn,
}
