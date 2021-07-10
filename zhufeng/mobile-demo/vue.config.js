const px2rem = require('postcss-px2rem');
const path = require('path')
module.exports = {
    lintOnSave:false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: path.resolve(__dirname, './src/common.scss')
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [require('postcss-px2rem')({
                  remUnit: 37.5 }), // 换算的基数
                ]
            }
        }
    },
}
