import legacy from '@vitejs/plugin-legacy'; //低版本浏览器兼容
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer'; //构建分析插件
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression'; //gzip压缩插件
import vitePluginImp from 'vite-plugin-imp'; //按需引入css
// import viteImagemin from 'vite-plugin-imagemin'; //图片资源压缩插件
// import viteCDNPlugin from 'vite-plugin-cdn-import'; //cdn加速插件

export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)), //使用@表示src这个路径
		},
	},
	server: {
		// 配置CORS
		cors: true,
		port: 3000,
		// open: './index.html',
		proxy: {
			// 选项写法
			'/api': {
				target: 'http://192.168.50.118:8080/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
	preview: {
		port: 8080,
	},
	build: {
		targets: 'es2015',
		rollupOptions: {
			output: {
				manualChunks: id => {
					// 将 node_modules 中的代码单独打包成一个 JS 文件,依赖包资源就不会重复请求，实现0缓存
					if (id.includes('node_modules')) {
						const name = id.toString().split('node_modules/')[1].split('/')[0];
						switch (name) {
							case 'html2canvas':
								return 'html2canvas';
							default:
								return 'vendor';
						}
					}
					return 'vendor';
				},
			},
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				// 如需定制 antd 主题，请取消以下内容注释 https://ant.design/docs/react/customize-theme
				// modifyVars: {
				//   hack: `true; @import "./src/theme.less";`,
				// },
			},
		},
	},
	plugins: [
		react(),
		legacy({
			targets: ['ie>=8'],
		}), //兼容低版本浏览器
		vitePluginImp({
			optimize: true,
			libList: [
				{
					libName: 'antd',
					style: name => `antd/es/${name}/style`,
				},
			],
		}), //按需引入
		viteCompression(), //gzip压缩
		visualizer(), // 将 visualizer 插件放到最后,构建成功之后会在根目录下生成一个 stats.html ，打开页面即可以看到分析结果。
	],
});
