module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "google",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "max-len": ["error", { "code": 140 }],
      "brace-style": [2, "1tbs", { "allowSingleLine": true }],
      "indent": ["error", 2],
      "object-curly-spacing": [2, "always"],
      "new-cap": 0,
      "require-jsdoc": ["error", {
        "require": {
            "FunctionDeclaration": false,
            "MethodDefinition": false,
            "ClassDeclaration": false,
            "ArrowFunctionExpression": false,
            "FunctionExpression": false
        }
    }]
    },
};
