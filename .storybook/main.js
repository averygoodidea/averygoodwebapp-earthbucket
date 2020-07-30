const path = require("path")

module.exports = {
  stories: ['../stories/**/*.stories.js','../stories/**/*.stories.jsx'],
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

    // for css modules
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
            //additionalData: '@import "main.scss";',
            sassOptions: {
              indentWidth: 4,
              includePaths: ["src/assets/sass"],
            },
          },
        },
        {
          loader: 'sass-resources-loader',
          options: {
            // Provide path to the file with resources
            resources: [
              // do not resolve ../src/assets/sass/font-icons.scss here because that creates a circular dependency within font-icons.scss!
              // instead, import that file in preview.js
              path.resolve(__dirname, '../src/assets/sass/normalize.scss'),
              path.resolve(__dirname, '../src/assets/sass/flexboxgrid.scss'),
              path.resolve(__dirname, '../src/assets/sass/vars.scss')
            ],
          },
        },
      ],
      include: [path.resolve(__dirname, '../src/')],
      exclude: [path.resolve(__dirname, '../src/components/atoms/comment-section/')]
    })

    // for global css imports
    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            //additionalData: '@import "main.scss";',
            sassOptions: {
              indentWidth: 4,
              includePaths: ["src/assets/sass"],
            },
          },
        },
        {
          loader: 'sass-resources-loader',
          options: {
            // Provide path to the file with resources
            resources: [
              // do not resolve ../src/assets/sass/font-icons.scss here because that creates a circular dependency within font-icons.scss!
              // instead, import that file in preview.js
              path.resolve(__dirname, '../src/assets/sass/normalize.scss'),
              path.resolve(__dirname, '../src/assets/sass/flexboxgrid.scss'),
              path.resolve(__dirname, '../src/assets/sass/vars.scss')
            ],
          },
        },
      ],
      include: [path.resolve(__dirname, '../src/components/atoms/comment-section/')]
    })
    
    config.module.rules.push({
      ///\.woff(2)?(\?[a-z0-9]+)?$/
      test: /\.woff(2)?(\?[a-z0-9]+)?$/,
      use: [
        {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]'
          }
        }
      ],
      include: path.resolve(__dirname, '../')
    });

    // reference source and test folders
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve('./src/'),
      path.resolve('./test/'),
    ];

    return config
  },
};
