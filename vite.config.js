import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost:1313',
            '/ws': {
                target: 'ws://localhost:1313',
                ws: true,
            },
        },
    },
});
