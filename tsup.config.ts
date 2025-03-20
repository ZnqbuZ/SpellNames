import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    outDir: "dist",
    minify: false,
    dts: true,
    sourcemap: false,
    clean: true,
    onSuccess: "node scripts/minify.js"
});
