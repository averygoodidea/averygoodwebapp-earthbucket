const path = require("path")

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-jest/register'],
  webpackFinal: async config => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ]

    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties"),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve("babel-plugin-remove-graphql-queries"),
    ]

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"]

    // Make whatever fine-grained changes you need

    // load in sass preprocessor
    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                // localIdentName: '[sha1:hash:hex:4]',
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'my-custom-hash',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            additionalData: '@import "main.scss";',
            sassOptions: {
              indentWidth: 4,
              includePaths: ["src/assets/sass"],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../src/')
    })

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve('./src/'),
    ];

    return config
  },
};
