import { defineConfig } from 'vite'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'
import path from 'path'

export default defineConfig({
    plugins: [vue2()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 8080
    }
})