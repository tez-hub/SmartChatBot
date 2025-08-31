import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  if (command === 'build') {
    // Library build configuration
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: 'src/index.js',
          name: 'SmartChatbot',
          fileName: 'index',
          formats: ['es']
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        }
      }
    }
  } else {
    // Development configuration
    return {
      plugins: [react()],
      root: 'demo',
      build: {
        outDir: '../dist-demo'
      }
    }
  }
})
