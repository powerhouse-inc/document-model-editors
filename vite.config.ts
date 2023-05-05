import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    plugins: [
        // nodePolyfills(),
        react({ jsxRuntime: 'classic' }),
        // tsConfigPaths({ root: './' }),
        // dts({
        //     include: ['src'],
        // }),
    ],
    build: {
        sourcemap: false,
        rollupOptions: {
            external: [
                'react',
                'react/jsx-runtime',
                // '@graphql-codegen/core',
                // '@graphql-codegen/typescript',
                // 'graphql-codegen-typescript-validation-schema',
            ],
            // plugins: [resolvePlugin(), commonjs(), esbuild(), css()],
        },
        commonjsOptions: {
            include: [],
            // ignore: ['module'],
            // transformMixedEsModules: true,
            // esmExternals: true,
        },
        lib: {
            entry: resolve('src', 'index.ts'),
            name: 'document-model-editors',
            formats: ['es'],
            fileName: format =>
                `document-model-editors.${format === 'cjs' ? 'cjs' : 'es.js'}`,
        },
        minify: false,
    },
    optimizeDeps: {
        disabled: false,
    },
    define: {
        __vite_process_env_NODE_ENV: JSON.stringify(mode),
    },
    // optimizeDeps: {
    //     include: [
    //         // 'monaco-editor',
    //         'lodash',
    //         '@graphql-codegen/plugin-helpers',
    //         'graphql-codegen-typescript-validation-schema',
    //         '@graphql-tools/relay-operation-optimizer > @ardatan/relay-compiler',
    //     ],
    //     esbuildOptions: {
    //         plugins: [
    //             NodeGlobalsPolyfillPlugin({
    //                 process: true,
    //                 buffer: true,
    //             }),
    //             NodeModulesPolyfillPlugin(),
    //         ],
    //     },
    //     // exclude: [
    //     //     ...Object.keys(packageJson.peerDependencies),
    //     //     // '@graphql-codegen/core',
    //     //     // '@graphql-codegen/typescript',
    //     //     // 'graphql-codegen-typescript-validation-schema',
    //     // ],
    // },
    // resolve: {
    //     alias: {
    //         './runtimeConfig': './runtimeConfig.browser',
    //         // crypto: 'rollup-plugin-node-polyfills/polyfills/crypto-browserify',
    //         path: 'rollup-plugin-node-polyfills/polyfills/path',
    //         util: 'rollup-plugin-node-polyfills/polyfills/util',
    //         process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    //         buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    //     },
    // },
}));
