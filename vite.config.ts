import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig(({ mode }) => ({
    plugins: [
        libInjectCss(),
        react({ jsxRuntime: 'classic' }),
        dts({
            include: ['src'],
        }),
    ],
    build: {
        sourcemap: false,
        rollupOptions: {
            external: [
                'react',
                'react/jsx-runtime',
                'document-model/document',
                /@storybook/,
            ],
        },
        lib: {
            entry: [resolve('src', 'index.ts')],
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
