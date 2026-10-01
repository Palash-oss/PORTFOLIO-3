import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      root: path.resolve(__dirname),
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'story-rewrite',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              if (req.url === '/story') {
                req.url = '/story.html';
              }
              if (req.url === '/cinematic' || req.url === '/cinematic/') {
                req.url = '/different story/index.html';
              }
              next();
            });
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            story: path.resolve(__dirname, 'story.html'),
            cinematic: path.resolve(__dirname, 'different story/index.html'),
          },
        },
      }
    };
});
