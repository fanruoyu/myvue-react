'rules': {
    // allow debugger during development
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "quotes": [
        "error",
        "single"
    ],//字符串必须使用单引号
    "semi": [2, "always"],//语句强制分号结尾 
    "indent": [2, 4],//缩进风格
    "eqeqeq": 2,//必须使用全等 
    "eol-last": 2,//文件以单一的换行符结束
    "curly": [2, "all"],//必须使用 if(){} 中的{}
    "camelcase": 2,//制驼峰法命名
    "consistent-this": [2, "that"],//this别名
    "no-unused-vars": [2],//不能有声明后未被使用的变量或参数
    "no-alert": 0,//禁止使用alert confirm
    "no-new": 0
  }
