import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev
export default defineConfig({
  base: '/t2-tariff-marketplace/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // для тестирования компонентов, если понадобится
  },
  resolve: {
    alias: {
      // Настраиваем абсолютные импорты для Feature-Sliced Design архитектуры
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Включаем минификацию (Vite по умолчанию использует esbuild, что очень быстро)
    minify: 'esbuild',
    sourcemap: false, // Отключаем на продакшене для уменьшения размера деплоя
    rollupOptions: {
      output: {
        // Экспертная оптимизация: разбиваем вендорные библиотеки в отдельный чанк
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('redux') || id.includes('rxjs')) {
              return 'vendor-core'; // Базовый стек t2 кэшируется отдельно
            }
            return 'vendor-utils';
          }
        },
      },
    },
  },
});
