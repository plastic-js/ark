import { defineConfig } from 'vitest/config'
import * as babel from '@babel/core'
import plasticPreset from '@plastic-js/babel-preset-plastic'

const plasticJsx = ()=> ({
	name: 'plastic-jsx',
	async transform(code, id) {
		if (!/\.jsx$/.test(id) || id.includes('node_modules')) return null
		const result = await babel.transformAsync(code, {
			filename: id,
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
	plugins: [plasticJsx()],
	oxc: {
		exclude: /\.jsx$/,
	},
	test: {
		environment: 'jsdom',
		include: ['test/**/*.test.js', 'src/components/**/tests/**/*.test.js'],
		setupFiles: ['test/setup.js'],
		server: {
			deps: {
				inline: ['@plastic-js/zag', '@plastic-js/plastic'],
			},
		},
	},
})
