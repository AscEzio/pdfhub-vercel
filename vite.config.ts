import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { generateScopedName } from './scripts/generateScopedName'

export default ({ mode }: UserConfig) => {
  return defineConfig({
    plugins: [
      react()
    ],
    define: {
      'process.env.NODE_ENV': `"${mode as string}"`
    },
    css: {
      // 配置modules命名生成规则
      modules: {
        generateScopedName,
        localsConvention: 'camelCase'
      },
      preprocessorOptions: {
        less: {
          math: 'always'
        }
      }
    },
    // 配置路径别名
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: ''
        },
        { find: '@', replacement: path.resolve(__dirname, 'src') }
      ]
    },
    base: './',
    // 自定义本地服务端口
    server: {
      port: 3150
    }
  })
}