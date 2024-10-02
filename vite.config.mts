import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { PagePath } from './src/shared/enums/page-path.enum';

export default defineConfig({
  base: PagePath.EMPTY_PATH,
  plugins: [react(
    {
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { 'legacy': true }],
          ['@babel/plugin-proposal-class-properties', { 'loose': true }],
        ],
      },
    })],
  server: {
    open: PagePath.EMPTY_PATH,
    host: true,
    port: 3000,
  },
});
