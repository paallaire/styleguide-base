import legacy from '@vitejs/plugin-legacy';

export default ({ command }) => ({
  base: command === 'serve' ? '' : '/dist/',
  build: {
    manifest: true,
    outDir: './dist/',
    rollupOptions: {
      input: {
        app: './assets/scripts/main.js',
      }
    },
  },
  server: {
    proxy: {
      '^(?!\/(src|node_modules|@vite|__vite_ping)).*': {
        target: 'http://localhost:4000',
      },
    }
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
  ],
});
