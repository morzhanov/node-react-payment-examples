module.exports = require('babel-jest').createTransformer({
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node-babel-7',
    'require-context-hook',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ]
  ]
})
