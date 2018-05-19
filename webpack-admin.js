const path = require ('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const LodashPlugin = require('lodash-webpack-plugin');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const isProduction = process.env.NODE_ENV === 'production';

// Loaders

const BabelLoader = {
	loader: 'babel-loader',
	options: {
		presets: ['es2015', 'react'],
		// plugins: [ 'lodash' ],
	},
};

const TypeScriptLoader = {
	loader: 'awesome-typescript-loader?silent=true',
	options: {
		configFileName: __dirname + '/tsconfig.json',
	},
};

// Plugins

const TypeScriptPathsPlugin = new TsConfigPathsPlugin({
	configFileName: path.join(__dirname, 'tsconfig.json'),
	compiler: 'typescript',
});

const OrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

const UglifyPlugin = new webpack.optimize.UglifyJsPlugin();

const ExtractSassPlugin = new ExtractTextPlugin({
	filename: 'admin.css',
});

// Main config, see other (sometimes environment depending) settings below

const webpackConfig = {
	entry: {
		'admin': [
			'babel-polyfill',
			'react-hot-loader/patch',
			__dirname + '/src/admin/index.tsx',
		]
	},
	output: {
		filename: 'admin.bundle.js',
		path: path.join(__dirname, 'out', 'bundle'),
		publicPath: '/static',
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [
			'.ts',
			'.tsx',
			'.js',
			'.json',
			'.css',
		],
		modules: [
			path.join(__dirname, 'src'),
			'node_modules',
		],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				// Mind that these loaders get executed in right-to-left order:
				use: [
					BabelLoader,
					TypeScriptLoader,
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractSassPlugin.extract({
					use: [{
						loader: 'css-loader?-url',
						options: {
							sourceMap: true,
							minimize: true
						}
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}],
					// use style-loader in development
					fallback: 'style-loader',
				}),
			},
			{
				test: /\.js$/,
				loaders: ['react-hot-loader/webpack', 'babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		],
	},

	plugins: [
		TypeScriptPathsPlugin,
		OrderPlugin,
		ExtractSassPlugin,
	],

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
};

// Enable source maps in development

if (!isProduction) {
	webpackConfig.devtool = 'source-map';
	/* webpackConfig.module.rules.push({
		enforce: 'pre',
		test: /\.js$/,
		loader: 'source-map-loader'
	}); */
}

// Production Plugins

// if (isProduction) {
// 	webpackConfig.plugins.push(
// 		new webpack.DefinePlugin({
// 			'process.env.NODE_ENV': JSON.stringify('production'),
// 		}),
// 		new webpack.optimize.UglifyJsPlugin(
// 			{
// 				minimize: true,
// 				compress: {
// 					warnings: false,
// 				},
// 			},
// 		),
// 	);
// }

// All good

module.exports = webpackConfig;
