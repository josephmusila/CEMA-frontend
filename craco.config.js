
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules.push({
          test: /\.js$/,
          include: /node_modules\/@mui/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator',
              ],
            },
          },
        });
        return webpackConfig;
      },
    },
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:8000',
            secure: false,
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
          },
        },
      },
    };