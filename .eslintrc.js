module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        /*由于这行，所有在 规则页面 被标记为 “” 的规则将会默认开启。
        可以在 npmjs.com 搜索 “eslint-config” 使用别人创建好的配置。
        只有在配置文件中扩展了一个可分享的配置或者明确开启一个规则，
        ESLint 才会去校验代码*/
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        /*错误级别
        off|0 关闭规则
        warn|1 将规则视为一个警告（不会影响退出码）
        error|2 将规则视为1个错误（退出码为1）
        */
        "semi":["error","always"],
        "quotes":["error","double"]
    }
};
