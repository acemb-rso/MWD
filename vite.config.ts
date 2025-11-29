import type { PluginOption, UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

const config: UserConfig = {
    publicDir: 'public',
    base: '/systems/anarchy/',
    server: {
        port: 30001,
        open: true,
        proxy: {
            '^(?!/systems/anarchy/)': 'http://localhost:30000/',
            '/socket.io': {
                target: 'ws://localhost:30000',
                ws: true,
            },
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            name: 'anarchy',
            entry: 'src/start.js',
            formats: ['es'],
            fileName: 'index',
        },
    },
    plugins: [
        visualizer({
            gzipSize: true,
            template: "treemap",
        })
    ]
}

export default config;
