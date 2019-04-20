module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2018,
        sourceType: 'module',
        // project: './tsconfig.json', // this has a big time perf hit right now
        tsconfigRootDir: './',
        extraFileExtensions: ['.vue'],
    },
    plugins: [
        'vue',
        '@typescript-eslint',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {},
        },
    },
    rules: {
        'import/prefer-default-export': 0,
        'import/no-unresolved': 'error',
        'class-methods-use-this': 0,
        'max-len': [1, 260, 2],
        'linebreak-style': 0,
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'vue/script-indent': ['error', 4, {
            switchCase: 1,
        }],
        'vue/html-indent': ['error', 4],
        'vue/require-component-is': 0, // this gives false positives currently. see https://github.com/vuejs/eslint-plugin-vue/issues/869
        '@typescript-eslint/explicit-function-return-type': ['warn', {
            allowExpressions: true
        }],
    },
};
