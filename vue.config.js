const path = require('path');
const webpack = require('webpack');

function resolveSrc(_path) {
  return path.join(__dirname, _path)
}

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        'src': resolveSrc('src'),
        'assets': resolveSrc('src/assets'),
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),
    ],
  },

  pwa: {
    name: 'PaperWallet',
    themeColor: '#66615B',
    msTileColor: '#66615B',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#66615B'
  },

  css: {
    // sourceMap: true
    sourceMap: process.env.NODE_ENV !== 'production'
  },

  pluginOptions: {
    electronBuilder: {
      nodeModulesPath: [
        '../../node_modules',
        './node_modules'
      ],
      builderOptions: {
        productName: 'PaperWallet',
        appId: 'top.postcoin.paperwallet',
        compression: 'maximum',
        artifactName: '${name}-${os}-${arch}-${version}.${ext}',
        directories: {
          output: 'build/target'
        },
        win: {
          target: 'nsis',
          icon: 'build/icons/icon.ico'
        },
        nsis: {
          perMachine: true,
          oneClick: false,
          allowToChangeInstallationDirectory: true
        }
      }
    },
    cordovaPath: 'src-cordova'
  },

  publicPath: '',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined
};
