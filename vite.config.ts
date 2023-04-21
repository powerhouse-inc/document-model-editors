import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(() => ({
    plugins: [
        react({ jsxRuntime: "classic" }),
        tsConfigPaths(),
        dts({
            include: ["src"],
        }),
    ],
    build: {
        rollupOptions: {
            external: ["react"],
        },
        lib: {
            entry: resolve("src", "index.ts"),
            name: "document-model-editors",
            formats: ["es", "cjs"],
            fileName: (format) =>
                `document-model-editors.${format === "cjs" ? "cjs" : "es.js"}`,
        },
        optimizeDeps: {
            exclude: Object.keys(packageJson.peerDependencies),
        },
        esbuild: {
            minify: true,
        },
    },
}));
