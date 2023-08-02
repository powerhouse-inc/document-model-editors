import react from '@vitejs/plugin-react';
import { readdirSync } from 'fs';
import { resolve, sep } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const files = readdirSync('./src/documents').map(folder =>
    resolve('src', 'documents', `${folder}`)
);

export default defineConfig(({ mode }) => ({
    plugins: [
        react({ jsxRuntime: 'classic' }),
        dts({
            include: ['src'],
        }),
    ],
    build: {
        sourcemap: false,
        rollupOptions: {
            external(id) {
                return (
                    ['react', 'react/jsx-runtime', 'zod'].includes(id) ||
                    id.includes('@acaldas/document-model-libs')
                );
            },
            output: {
                entryFileNames: chunkInfo => {
                    let module = chunkInfo.facadeModuleId.split(sep).at(-2);
                    if (module === 'src') {
                        module = 'index';
                    }
                    return `${module}.es.js`;
                },
                assetFileNames: `[name].[ext]`,
            },
        },
        commonjsOptions: {
            include: [],
        },
        lib: {
            entry: [resolve('src', 'index.ts'), ...files],
            formats: ['es'],
        },
        minify: false,
    },
    optimizeDeps: {
        disabled: false,
    },
    define: {
        __vite_process_env_NODE_ENV: JSON.stringify(mode),
    },
}));
