const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //按需加载  自动引入
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,  //可以加载less文件
    }),
    //自定义样式
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
);