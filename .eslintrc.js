module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-eval': 'error',
    'semi': ['error', 'always'], // 必须用;结尾
    'no-var': 'error',
    'no-with': 'error',
    'arrow-parens': ['error', 'always'], // 箭头函数必须用括号
    'camelcase': 'error' // 强制使用驼峰命名
  }
}
