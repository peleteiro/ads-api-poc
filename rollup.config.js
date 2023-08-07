import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'lib',
        format: 'iife',
        sourcemap: true,
      },
    ],
    external: ['tslib'],
    plugins: [
      commonjs({
        include: 'node_modules/**',
      }),
      resolve(),
      json(),
      typescript(),
      terser(),
    ],
  },
]
