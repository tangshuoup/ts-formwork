/*
 * @Descripttion: 
 * @version: 
 * @Author: tangshuo
 * @Date: 2021-10-12 15:52:39
 * @LastEditors: tangshuo
 * @LastEditTime: 2021-11-02 16:20:43
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/pages/components/loading'
  },
  layout:{
    name: 'ts-formwork',
    locale: false
  },
  routes: [
    { exact:true, path: '/',  component: '@/pages/index' },
  ],
  fastRefresh: {},
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            css: {
              name: "css",
              test: /\.(css|less)$/,
              minChunks: 2,
              enforce: true,
            },
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
            default: {
              minChunks: 2, //覆盖外层的全局属性
              priority: -20,
              reuseExistingChunk: true, //是否复用已经从原代码块中分割出来的模块
            },
          },
        },
      },
    });
  },
  webpack5: {
    lazyCompilation: {
      imports: true   // 基于路由按需加载
    }
  }
});
