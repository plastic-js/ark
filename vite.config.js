import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import * as babel from '@babel/core'
import plasticPreset from '@plastic-js/babel-preset-plastic'

const plasticJsx = ()=> ({
	name: 'plastic-jsx',
	enforce: 'pre',
	async transform(code, id) {
		const [path] = id.split('?')
		if (!/\.jsx$/.test(path) || path.includes('node_modules')) return null
		const result = await babel.transformAsync(code, {
			filename: path,
			babelrc: false,
			configFile: false,
			sourceMaps: true,
			parserOpts: { plugins: ['jsx'] },
			presets: [plasticPreset],
		})
		return result ? { code: result.code, map: result.map } : null
	},
})

export default defineConfig({
	root: resolve(__dirname, 'showcase'),
	publicDir: false,
	cacheDir: resolve(__dirname, '.vite-cache'),
	plugins: [plasticJsx()],
	esbuild: {
		exclude: [/\.jsx$/],
	},
	optimizeDeps: {
		noDiscovery: true,
	},
	server: {
		port: 3333,
		open: true,
	},
})
