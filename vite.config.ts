import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
            external: ['react', 'react/jsx-runtime'],
        },
        commonjsOptions: {
            include: [],
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
}));
