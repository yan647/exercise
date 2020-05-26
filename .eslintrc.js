module.exports = {
    "env": {//指定程序的目标环境
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        /*由于这行，所有在 规则页面 被标记为 “” 的规则将会默认开启。
        可以在 npmjs.com 搜索 “eslint-config” 使用别人创建好的配置。
        只有在配置文件中扩展了一个可分享的配置或者明确开启一个规则，
        ESLint 才会去校验代码*/
        "eslint:recommended",//启用推荐的规则，报告一些常见的问题
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {//脚本在执行期间访问的额外的全局变量
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",//将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用
    "parserOptions": {//解析器选项
        "ecmaVersion": 11,// ECMAScript 版本
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        /*
        配置规则写在rules对象里面，key表示规则名称，value表示规则的配置。
        错误级别
        off|0 关闭规则
        warn|1 将规则视为一个警告（不会影响退出码）
        error|2 将规则视为1个错误（退出码为1）
        */
        "semi": ["error", "always"],
        "indent":["error",4],//缩进
        "quotes": ["error", "double"],//引号
        "no-console": "warn"
    }
};
