module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-await-in-loop': 'warn',
    'react/jsx-no-target-blank': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'react/forbid-prop-types': 'warn',
    'react/button-has-type': 'off',
    'jsx-a11y/control-has-associated-label': 'warn',
    'react/jsx-wrap-multilines': 'warn',
    'react/jsx-boolean-value': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'warn',
    'no-unused-vars': 'warn',
    // props 檢查
    'react/prop-types': 'warn',
    // 解構 props
    'react/destructuring-assignment': 'warn',
    'no-shadow': 'warn',
  },
};
